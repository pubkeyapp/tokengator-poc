import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getTokenMint, Minter } from '@tokengator/minter'

export function useGetTokenMint({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['mint', { minter }],
    queryFn: async () =>
      Promise.all([
        getTokenMint({ connection, minter }),
        getTokenMetadata(connection, minter.mint.publicKey, 'confirmed', TOKEN_2022_PROGRAM_ID),
      ]).then(([mint, metadata]) => ({ mint, metadata })),
    retry: false,
  })
}
