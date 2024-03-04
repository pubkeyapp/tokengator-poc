import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { mintPayment } from '@tokengator/presets'

export function useMintPayment({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-payment-holders'],
    mutationFn: async ({ amount, destination }: { amount: number; destination: PublicKey }) => {
      return mintPayment({ amount, connection, destination, feePayer })
    },
  })
}
