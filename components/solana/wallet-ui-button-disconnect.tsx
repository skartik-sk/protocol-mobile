import { useWalletUi } from '@/components/solana/use-wallet-ui'
import React from 'react'
import Button from '../ui/Button'

export function WalletUiButtonDisconnect({ label = 'Disconnect' }: { label?: string }) {
  const { disconnect } = useWalletUi()

  return <Button title={label} onPress={() => disconnect()} />
}
