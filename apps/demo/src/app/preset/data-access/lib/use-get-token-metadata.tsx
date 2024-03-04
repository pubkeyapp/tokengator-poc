import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'

export function useGetTokenMetadata({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['use-get-token-metadata', { address }],
    queryFn: () => getTokenMetadata(connection, address, 'confirmed', TOKEN_2022_PROGRAM_ID),
    retry: false,
  })
}
