import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getPreOrderHolders } from '@tokengator/presets'

export function useGetPreOrderHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['pre-order-holders'],
    queryFn: async () => getPreOrderHolders({ connection }),
    retry: false,
  })
}
