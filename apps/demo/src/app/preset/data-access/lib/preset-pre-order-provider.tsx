import { Mint } from '@solana/spl-token'
import { PreOrderHolder, Preset } from '@tokengator/presets'
import { createContext, ReactNode, useContext } from 'react'
import { useGetPreOrderHolders } from './use-get-pre-order-holders'

export interface PresetPreOrderProviderContext {
  holders: PreOrderHolder[]
  isLoading: boolean
  mint: Mint
  preset: Preset
  refresh: () => void
}

const Context = createContext<PresetPreOrderProviderContext>({} as PresetPreOrderProviderContext)

export function PresetPreOrderProvider({
  children,
  mint,
  preset,
}: {
  children: ReactNode
  mint: Mint
  preset: Preset
}) {
  const query = useGetPreOrderHolders()
  const value: PresetPreOrderProviderContext = {
    holders: query.data ?? [],
    isLoading: query.isLoading,
    mint,
    preset,
    refresh: () => query.refetch(),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePresetPreOrder() {
  return useContext(Context)
}
