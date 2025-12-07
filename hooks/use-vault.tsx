import { PublicKey, TransactionInstruction, TransactionSignature } from '@solana/web3.js'
import { useConnection } from '@/components/solana/solana-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useWalletUi } from '@/components/solana/use-wallet-ui'
// import { createTransaction } from '@/components/account/create-transaction'
// import { useGetBalanceInvalidate } from './use-get-balance'
import {
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionMessage,
  
  VersionedTransaction,
} from '@solana/web3.js'
import { getBalanceQueryKey, useGetBalanceInvalidate, useGetBalanceQueryKey } from './use-get-balance'
import { ProgramAddress } from '@/constants/program-address'

export  function getVaultaddress({
  address,
}: {
  address: PublicKey
}): PublicKey {
  // Find the vault PDA for the given address
   const [vault] = PublicKey.findProgramAddressSync(
    [new Uint8Array([118, 97, 117, 108, 116]), address.toBytes()],
    ProgramAddress.Vault
  );
  return vault;
 
}

function getInstructionData(amount: bigint, isWithdraw: boolean= false): Uint8Array {
    const buffer = new ArrayBuffer(9); // 1 byte (discriminator) + 8 bytes (amount)
    const view = new DataView(buffer);
    
    view.setUint8(0, isWithdraw ? 1 : 0); // The Discriminator (0 for Deposit, 1 for Withdraw)
    view.setBigUint64(1, amount, true); // The Amount (Little Endian)
    console.log(amount)
    // Use Uint8Array instead of Buffer for browser compatibility
    let toreturn = new Uint8Array(buffer);
  return toreturn 
}
 async function createDepositVaultTransaction({
  address,
  amount,
  connection,
}: {
  address: PublicKey
  amount: number
  connection: Connection
}): Promise<{
  transaction: VersionedTransaction
  vault: PublicKey
  minContextSlot: number
}> {
  // Get the latest blockhash and slot to use in our transaction
  const {
    context: { slot: minContextSlot },
    value: latestBlockhash,
  } = await connection.getLatestBlockhashAndContext()
  const [vault] =  PublicKey.findProgramAddressSync(
    [ new Uint8Array([118, 97, 117, 108, 116]), address.toBytes()],
    ProgramAddress.Vault
  )
  const instructions:TransactionInstruction[] = [
    {
      keys: [
        { pubkey: address, isSigner: true, isWritable: true },
        { pubkey: vault, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: ProgramAddress.Vault,
          // @ts-ignore - Uint8Array is compatible with Buffer in this context
      data: getInstructionData( BigInt(amount*LAMPORTS_PER_SOL))
    }
  ]
  
  console.log("instructions",instructions)
  

  // Create a new TransactionMessage with version and compile it to legacy
  const messageLegacy = new TransactionMessage({
    payerKey: address,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToLegacyMessage()

  // Create a new VersionedTransaction which supports legacy and v0
  const transaction = new VersionedTransaction(messageLegacy)

  return {
    transaction,
    vault,
    minContextSlot,
  }
}


export function useDepositVault() {
  const connection = useConnection()
  const { signAndSendTransaction,account } = useWalletUi()
        const queryClient = useQueryClient()


  return useMutation({
    mutationKey: ['Deposit-Vault', { endpoint: connection.rpcEndpoint }],
    mutationFn: async (input: { amount: number }) => {
      let signature: TransactionSignature = ''
      try {
        if(!account)return 
        const { transaction, vault, minContextSlot } = await createDepositVaultTransaction({
          address:account.publicKey,
          amount: input.amount,
          connection,
        })

        // Send transaction and await for signature
        signature = await signAndSendTransaction(transaction, minContextSlot)
        const {
          value: latestBlockhash,
        } = await connection.getLatestBlockhashAndContext()
        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        return { signature, userAddress: account.publicKey, vault }
      } catch (error: unknown) {
        console.log('error', `Transaction failed! ${error}`, signature)

        return
      }
    },
    onSuccess: async (data) => {
      if (!data) return
         
         console.log('Transaction successful:', data.signature)
         
         // Invalidate both user balance and vault balance
         const userBalanceKey = getBalanceQueryKey({ 
           address: data.userAddress, 
           endpoint: connection.rpcEndpoint 
         })
         const vaultBalanceKey = getBalanceQueryKey({ 
           address: data.vault, 
           endpoint: connection.rpcEndpoint 
         })
         
         await Promise.all([
           queryClient.invalidateQueries({ queryKey: userBalanceKey }),
           queryClient.invalidateQueries({ queryKey: vaultBalanceKey })
         ])
         
         console.log('Balances refetched successfully')
    },
    onError: (error) => {
      console.error(`Transaction failed! ${error}`)
    },
  })
}


async function createWithdrawVaultTransaction({
 address,
 amount,
 connection,
}: {
 address: PublicKey
 amount: number
 connection: Connection
}): Promise<{
 transaction: VersionedTransaction
 vault: PublicKey
 minContextSlot: number
}> {
 // Get the latest blockhash and slot to use in our transaction
 const {
   context: { slot: minContextSlot },
   value: latestBlockhash,
 } = await connection.getLatestBlockhashAndContext()
 const [vault] =  PublicKey.findProgramAddressSync(
   [ new Uint8Array([118, 97, 117, 108, 116]), address.toBytes()],
   ProgramAddress.Vault
 )
 const instructions:TransactionInstruction[] = [
   {
     keys: [
       { pubkey: address, isSigner: true, isWritable: true },
       { pubkey: vault, isSigner: false, isWritable: true },
       { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
     ],
     programId: ProgramAddress.Vault,
         // @ts-ignore - Uint8Array is compatible with Buffer in this context
     data: getInstructionData( BigInt(amount*LAMPORTS_PER_SOL),true)
   }
 ]
 
 console.log("instructions",instructions)
 

 // Create a new TransactionMessage with version and compile it to legacy
 const messageLegacy = new TransactionMessage({
   payerKey: address,
   recentBlockhash: latestBlockhash.blockhash,
   instructions,
 }).compileToLegacyMessage()

 // Create a new VersionedTransaction which supports legacy and v0
 const transaction = new VersionedTransaction(messageLegacy)

 return {
   transaction,
   vault,
   minContextSlot,
 }
}


export function useWithdrawVault() {
 const connection = useConnection()
 const { signAndSendTransaction,account } = useWalletUi()
     const queryClient = useQueryClient()


 return useMutation({
   mutationKey: ['Withdraw-Vault', { endpoint: connection.rpcEndpoint }],
   mutationFn: async (input: { amount: number }) => {
     let signature: TransactionSignature = ''
     try {
       if(!account)return 
       const { transaction, vault, minContextSlot } = await createWithdrawVaultTransaction({
         address:account.publicKey,
         amount: input.amount,
         connection,
       })

       // Send transaction and await for signature
       signature = await signAndSendTransaction(transaction, minContextSlot)
       const {
         value: latestBlockhash,
       } = await connection.getLatestBlockhashAndContext()
       // Send transaction and await for signature
       await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

      
       return { signature, userAddress: account.publicKey, vault }
     } catch (error: unknown) {
       console.log('error', `Transaction failed! ${error}`, signature)
       throw error
     }
   },
   onSuccess: async (data) => {
     if (!data) return
     
     console.log('Transaction successful:', data.signature)
     
     // Invalidate both user balance and vault balance
     const userBalanceKey = getBalanceQueryKey({ 
       address: data.userAddress, 
       endpoint: connection.rpcEndpoint 
     })
     const vaultBalanceKey = getBalanceQueryKey({ 
       address: data.vault, 
       endpoint: connection.rpcEndpoint 
     })
     
     await Promise.all([
       queryClient.invalidateQueries({ queryKey: userBalanceKey }),
       queryClient.invalidateQueries({ queryKey: vaultBalanceKey })
     ])
   },
   onError: (error) => {
     console.error(`Transaction failed! ${error}`)
   },
 })
}
