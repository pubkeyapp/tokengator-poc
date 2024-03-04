import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { closeToken, createToken, getTokenMint, Minter } from '@tokengator/minter'
import { Preset, presets } from '@tokengator/presets'
import { createContext, ReactNode, useContext } from 'react'

export interface PresetProviderContext {
  presets: Preset[]
}

const Context = createContext<PresetProviderContext>({} as PresetProviderContext)

export function PresetProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={{ presets }}>{children}</Context.Provider>
}

export function usePreset() {
  return useContext(Context)
}

export function useGetTokenMint({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['mint', { minter }],
    queryFn: async () => {
      return Promise.all([
        getTokenMint({ connection, minter }),
        getTokenMetadata(connection, minter.mint.publicKey, 'confirmed', TOKEN_2022_PROGRAM_ID),
      ]).then(([mint, metadata]) => ({ mint, metadata }))
    },
    retry: false,
  })
}

export function useCreateToken({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['create-token', minter.mint.publicKey.toString()],
    mutationFn: async () => {
      return createToken({ connection, minter })
    },
  })
}

export function useCloseToken({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['close-token', minter.mint.publicKey.toString()],
    mutationFn: async () => {
      return closeToken({ connection, minter })
    },
  })
}
