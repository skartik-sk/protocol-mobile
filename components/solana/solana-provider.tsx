import { clusterApiUrl, Connection, type ConnectionConfig } from '@solana/web3.js'
import React, { createContext, type ReactNode, useContext, useMemo } from 'react'


export interface SolanaProviderState {
  connection: Connection
}

export interface SolanaProviderProps {
  children: ReactNode
  config?: ConnectionConfig
}

const ConnectionContext = createContext<SolanaProviderState>({} as SolanaProviderState)

export function SolanaProvider({ children, config = { commitment: 'confirmed' } }: SolanaProviderProps) {

  const connection = useMemo(() => new Connection(clusterApiUrl('devnet'), config), [ config])

  return <ConnectionContext.Provider value={{ connection }}>{children}</ConnectionContext.Provider>
}

export function useSolana(): SolanaProviderState {
  return useContext(ConnectionContext)
}

export function useConnection(): Connection {
  return useSolana().connection
}
