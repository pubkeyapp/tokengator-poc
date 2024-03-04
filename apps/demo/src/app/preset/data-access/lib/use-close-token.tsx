import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation } from '@tanstack/react-query'
import { closeToken, Minter } from '@tokengator/minter'

export function useCloseToken({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['close-token', minter.mint.publicKey.toString()],
    mutationFn: async () => closeToken({ connection, minter }),
  })
}
