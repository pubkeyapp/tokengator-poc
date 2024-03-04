import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { verifyBusinessVisa } from '@tokengator/presets'

export function useVerifyBusinessVisa() {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['verify-business-visa'],
    mutationFn: async (owner: PublicKey) => verifyBusinessVisa({ connection, owner }),
  })
}
