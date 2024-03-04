import { Mint } from '@solana/spl-token'
import { PaymentHolder } from '@tokengator/presets'
import { createContext, ReactNode, useContext } from 'react'
import { useGetPaymentHolders } from './use-get-payment-holders'

export interface PresetPaymentProviderContext {
  holders: PaymentHolder[]
  isLoading: boolean
  refresh: () => void
}

const Context = createContext<PresetPaymentProviderContext>({} as PresetPaymentProviderContext)

export function PresetPaymentProvider({ children, mint }: { children: ReactNode; mint: Mint }) {
  const query = useGetPaymentHolders()
  const value: PresetPaymentProviderContext = {
    holders: query.data ?? [],
    isLoading: query.isLoading,
    refresh: () => query.refetch(),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePresetPayment() {
  return useContext(Context)
}
