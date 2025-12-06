import { useWalletUi } from '@/components/solana/use-wallet-ui'
import React from 'react'
import Button from '../ui/Button'

export function WalletUiButtonConnect({ label = 'Connect' }: { label?: string }) {
  const { connect } = useWalletUi()

  return <Button title={label}  onPress={() => connect()} />
}
