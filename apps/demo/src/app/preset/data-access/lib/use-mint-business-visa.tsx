import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { mintBusinessVisa } from '@tokengator/presets'

export function useMintBusinessVisa({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-business-visa-holders'],
    mutationFn: async (destination: PublicKey) => mintBusinessVisa({ connection, destination, feePayer }),
  })
}
