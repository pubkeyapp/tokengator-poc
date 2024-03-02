import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function SolanaUiSolPrice({ lamports = 0 }: { lamports?: number }) {
  return Math.round(lamports / LAMPORTS_PER_SOL)
}
