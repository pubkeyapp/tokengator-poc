import { IconBrandGithub, IconBrandX } from '@tabler/icons-react'
import { Navigate, useRoutes } from 'react-router-dom'
import { AccountFeature } from './account/feature'
import { AppLayout } from './app-layout'
import { ClusterFeature } from './cluster/feature'
import { HomeFeature } from './home/feature'
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
          { label: 'Introduction', link: '/introduction' },
          { label: 'Presets', link: '/presets' },
          { label: 'Users', link: '/users' },
          { label: 'CLI', link: '/cli' },
        ]}
      >
        <AppRoutes />
      </AppLayout>
    </WebShellProviders>
  )
}

export function AppRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="/introduction" replace /> },
    { path: '/presets/*', element: <PresetFeature /> },
    { path: '/accounts/*', element: <AccountFeature /> },
    { path: '/clusters/*', element: <ClusterFeature /> },
    { path: '/keypairs/*', element: <KeypairFeature /> },
    { path: '/solana/*', element: <SolanaFeature /> },
    { path: '/users/*', element: <UserFeature /> },
    { path: '*', element: <HomeFeature /> },
  ])
}
