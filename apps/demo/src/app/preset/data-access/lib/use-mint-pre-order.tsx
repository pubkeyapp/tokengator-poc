import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { mintPreOrder } from '@tokengator/presets'

export function useMintPreOrder({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-pre-order-holders'],
    mutationFn: async ({ amount, destination }: { amount: number; destination: PublicKey }) =>
      mintPreOrder({
        amount,
        connection,
        destination,
        feePayer,
      }),
  })
}
