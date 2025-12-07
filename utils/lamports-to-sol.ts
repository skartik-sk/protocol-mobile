import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function lamportsToSol(balance: number) {
  return Math.round((balance / LAMPORTS_PER_SOL) * 10000) / 10000
}


export function lamportsToSolDigit(balance: number) {
  const sol = balance / LAMPORTS_PER_SOL
  return Math.floor(sol).toString()
}

export function lamportsToSolDecimal(balance: number) {
  const sol = balance / LAMPORTS_PER_SOL
  const integerPart = Math.floor(sol)
  const decimalPart = sol - integerPart
  
  // Convert to string and extract decimal digits
  const decimalString = decimalPart.toFixed(9) // 9 decimals for SOL precision
  const decimalDigits = decimalString.split('.')[1]
  
  // Remove trailing zeros
  const trimmed = decimalDigits?.replace(/0+$/, '') || '0'
  
  return trimmed
}