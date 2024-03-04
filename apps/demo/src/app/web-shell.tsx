import { IconBrandGithub, IconBrandX } from '@tabler/icons-react'
import { UiNotFound } from '@tokengator/ui'
import { useRoutes } from 'react-router-dom'
import { AccountFeature } from './account/feature'
import { AppLayout } from './app-layout'
import { ClusterFeature } from './cluster/feature'
import { KeypairFeature } from './keypair/feature'
import { PresetFeature } from './preset/feature'
import { SolanaFeature } from './solana/feature'
import { UserFeature } from './user/feature'

import { WebShellProviders } from './web-shell-providers'

export function WebShell() {
  return (
    <WebShellProviders>
      <AppLayout
        icons={[
          {
            href: 'https://github.com/pubkeyapp/tokengator',
            icon: <IconBrandGithub />,
          },
          { href: 'https://x.com/pubkeyapp', icon: <IconBrandX /> },
        ]}
        links={[
          { label: 'Presets', link: '/presets' },
          { label: 'Users', link: '/users' },
        ]}
      >
        <AppRoutes />
      </AppLayout>
    </WebShellProviders>
  )
}

export function AppRoutes() {
  return useRoutes([
    { path: '/presets/*', element: <PresetFeature /> },
    { path: '/accounts/*', element: <AccountFeature /> },
    { path: '/clusters/*', element: <ClusterFeature /> },
    { path: '/keypairs/*', element: <KeypairFeature /> },
    { path: '/solana/*', element: <SolanaFeature /> },
    { path: '/users/*', element: <UserFeature /> },
    { path: '*', element: <UiNotFound /> },
  ])
}
