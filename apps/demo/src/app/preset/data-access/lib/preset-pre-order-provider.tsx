import { Mint } from '@solana/spl-token'
import { PreOrderHolder } from '@tokengator/presets'
import { createContext, ReactNode, useContext } from 'react'
import { useGetPreOrderHolders } from './use-get-pre-order-holders'

export interface PresetPreOrderProviderContext {
  holders: PreOrderHolder[]
  isLoading: boolean
  refresh: () => void
}

const Context = createContext<PresetPreOrderProviderContext>({} as PresetPreOrderProviderContext)

export function PresetPreOrderProvider({ children, mint }: { children: ReactNode; mint: Mint }) {
  const query = useGetPreOrderHolders()
  const value: PresetPreOrderProviderContext = {
    holders: query.data ?? [],
    isLoading: query.isLoading,
    refresh: () => query.refetch(),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePresetPreOrder() {
  return useContext(Context)
}
