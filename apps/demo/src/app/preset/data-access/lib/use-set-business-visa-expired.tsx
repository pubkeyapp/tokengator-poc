import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { Minter } from '@tokengator/minter'
import { setBusinessVisaExpired } from '@tokengator/presets'

export function useSetBusinessVisaExpired({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['setBusinessVisaExpired', { minter }],
    mutationFn: async () => setBusinessVisaExpired({ connection, minter }),
  })
}
