import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getBusinessVisaHolders } from '@tokengator/presets'

export function useGetBusinessVisaHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['business-visa-holders'],
    queryFn: async () => getBusinessVisaHolders({ connection }),
    retry: false,
  })
}
