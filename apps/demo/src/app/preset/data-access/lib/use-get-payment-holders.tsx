import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getPaymentHolders } from '@tokengator/presets'

export function useGetPaymentHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['payment-holders'],
    queryFn: async () => {
      return getPaymentHolders({ connection })
    },
  })
}
