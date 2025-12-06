import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { SolanaProvider } from '@/components/solana/solana-provider'

import { AuthProvider } from '@/components/solana/auth-provider'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (

      <QueryClientProvider client={queryClient} >

          <SolanaProvider>
            <AuthProvider>{children}</AuthProvider>
          </SolanaProvider>

      </QueryClientProvider>

  )
}
