import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { verifyPreOrder } from '@tokengator/presets'

export function useVerifyPreOrder() {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['verify-pre-order'],
    mutationFn: async (owner: PublicKey) => verifyPreOrder({ connection, owner }),
  })
}
