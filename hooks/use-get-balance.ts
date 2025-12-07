import { useConnection } from '@/components/solana/solana-provider';
import { PublicKey } from '@solana/web3.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'


export function getBalanceQueryKey({ address, endpoint }: { address: PublicKey; endpoint: string }) {
  return ['get-balance', { endpoint, address }]
}

export function useGetBalance({ address }: { address: PublicKey }) {
  const connection = useConnection()
  const queryKey = getBalanceQueryKey({ address, endpoint: connection.rpcEndpoint })

  return useQuery({
    queryKey,
    queryFn: () => connection.getBalance(address),
  })
}

export function useGetBalanceInvalidate({ address }: { address: PublicKey }) {
  const connection = useConnection()
  const queryKey = getBalanceQueryKey({ address, endpoint: connection.rpcEndpoint })
  const client = useQueryClient()

  return () => client.invalidateQueries({ queryKey })
}
