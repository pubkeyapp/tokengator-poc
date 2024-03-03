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
