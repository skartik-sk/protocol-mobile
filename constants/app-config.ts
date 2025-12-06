import { clusterApiUrl } from "@solana/web3.js"

export class AppConfig {
  static name = 'protocol-mobile'
  static uri = 'https://skartik.xyz'
  static cluster = [
    {
      id: 'solana:devnet',
      name: 'Devnet',
      endpoint: clusterApiUrl('devnet'),
      network: 'devnet',
    },
    
  ]
}
