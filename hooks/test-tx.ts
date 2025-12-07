import { PublicKey, TransactionSignature } from '@solana/web3.js'
import { useConnection } from '@/components/solana/solana-provider'
import { useMutation } from '@tanstack/react-query'
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

export async function createTransaction({
  publicKey,
  destination,
  amount,
  connection,
}: {
  publicKey: PublicKey
  destination: PublicKey
  amount: number
  connection: Connection
}): Promise<{
  transaction: VersionedTransaction
  latestBlockhash: { blockhash: string; lastValidBlockHeight: number }
  minContextSlot: number
}> {
  // Get the latest blockhash and slot to use in our transaction
  const {
    context: { slot: minContextSlot },
    value: latestBlockhash,
  } = await connection.getLatestBlockhashAndContext()

  // Create instructions to send, in this case a simple transfer
  const instructions = [
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: destination,
      lamports: amount * LAMPORTS_PER_SOL,
    }),
  ]

  // Create a new TransactionMessage with version and compile it to legacy
  const messageLegacy = new TransactionMessage({
    payerKey: publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToLegacyMessage()

  // Create a new VersionedTransaction which supports legacy and v0
  const transaction = new VersionedTransaction(messageLegacy)

  return {
    transaction,
    latestBlockhash,
    minContextSlot,
  }
}

export function useTransferSol({ address }: { address: PublicKey }) {
  const connection = useConnection()
  const { signAndSendTransaction } = useWalletUi()


  return useMutation({
    mutationKey: ['transfer-sol', { endpoint: connection.rpcEndpoint, address }],
    mutationFn: async (input: { destination: PublicKey; amount: number }) => {
      let signature: TransactionSignature = ''
      try {
        const { transaction, latestBlockhash, minContextSlot } = await createTransaction({
          publicKey: address,
          destination: input.destination,
          amount: input.amount,
          connection,
        })

        // Send transaction and await for signature
        signature = await signAndSendTransaction(transaction, minContextSlot)

        // Send transaction and await for signature
        await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')

        console.log(signature)
        return signature
      } catch (error: unknown) {
        console.log('error', `Transaction failed! ${error}`, signature)

        return
      }
    },
    onSuccess: async (signature) => {
      console.log(signature)
      // await invalidateBalance()
    },
    onError: (error) => {
      console.error(`Transaction failed! ${error}`)
    },
  })
}
