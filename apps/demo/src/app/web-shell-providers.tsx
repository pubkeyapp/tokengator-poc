import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UiThemeProvider } from '@tokengator/ui'

import { ReactNode } from 'react'
import { ClusterProvider } from './cluster/data-access'
import { KeypairProvider } from './keypair/data-access'
import { LabelsProvider } from './labels-provider'
import { SolanaProvider } from './solana/data-access'

const client = new QueryClient()
export function WebShellProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <UiThemeProvider>
        <KeypairProvider>
          <ClusterProvider>
            <SolanaProvider>
              <LabelsProvider>{children}</LabelsProvider>
            </SolanaProvider>
          </ClusterProvider>
        </KeypairProvider>
      </UiThemeProvider>
    </QueryClientProvider>
  )
}
