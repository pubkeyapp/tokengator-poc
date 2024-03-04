import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { verifyPayment } from '@tokengator/presets'

export function useVerifyPayment() {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['verify-payment'],
    mutationFn: async (owner: PublicKey) => verifyPayment({ connection, owner }),
  })
}
