import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { Minter } from '@tokengator/minter'
import { setBusinessVisaActive } from '@tokengator/presets'

export function useSetBusinessVisaActive({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['setBusinessVisaActive', { minter }],
    mutationFn: async () => setBusinessVisaActive({ connection, minter }),
  })
}
