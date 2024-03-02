import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import { createUmi as createDefaultUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createContext, ReactNode, useContext } from 'react'

export function createUmi(endpoint: string) {
  return createDefaultUmi(endpoint, 'confirmed').use(dasApi())
}

export interface UmiProviderContext {
  umi: ReturnType<typeof createUmi>
}

const Context = createContext<UmiProviderContext>({} as UmiProviderContext)

export function UmiProvider({ children, endpoint }: { children: ReactNode; endpoint: string }) {
  return (
    <Context.Provider
      value={{
        umi: createUmi(endpoint),
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useUmi() {
  return useContext(Context)
}
