import { Mint } from '@solana/spl-token'
import { PaymentHolder, Preset } from '@tokengator/presets'
import { createContext, ReactNode, useContext } from 'react'
import { useGetPaymentHolders } from './use-get-payment-holders'

export interface PresetPaymentProviderContext {
  holders: PaymentHolder[]
  isLoading: boolean
  mint: Mint
  preset: Preset
  refresh: () => void
}

const Context = createContext<PresetPaymentProviderContext>({} as PresetPaymentProviderContext)

export function PresetPaymentProvider({ children, mint, preset }: { children: ReactNode; mint: Mint; preset: Preset }) {
  const query = useGetPaymentHolders()
  const value: PresetPaymentProviderContext = {
    holders: query.data ?? [],
    isLoading: query.isLoading,
    mint,
    preset,
    refresh: () => query.refetch(),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePresetPayment() {
  return useContext(Context)
}
