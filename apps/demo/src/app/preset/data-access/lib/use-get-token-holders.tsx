import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getTokenHolders, Minter } from '@tokengator/minter'

export function useGetTokenHolders({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['business-visa-holders', { minter }],
    queryFn: async () => getTokenHolders({ connection, minter }),
    retry: false,
  })
}
