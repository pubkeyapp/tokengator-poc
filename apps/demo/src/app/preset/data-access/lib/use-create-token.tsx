import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { createToken, Minter } from '@tokengator/minter'

export function useCreateToken({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['create-token', minter.mint.publicKey.toString()],
    mutationFn: async () => createToken({ connection, minter }),
  })
}
