import { TypographyStylesProvider } from '@mantine/core'
import { IconDashboard, IconTerminal } from '@tabler/icons-react'
import { UiGroup, UiNotFound } from '@tokengator/ui'
import Markdown from 'react-markdown'
import { Navigate, useParams, useRoutes } from 'react-router-dom'
import { UserUiGridItem } from '../../../user/ui'
import { HomeUiSidebarLayout } from '../../ui'
import { cliPageCloseToken } from './cli-pages/cli-page-close-token'
import { cliPageCreateToken } from './cli-pages/cli-page-create-token'
import { cliPageFeePayer } from './cli-pages/cli-page-fee-payer'
import { cliPageHolders } from './cli-pages/cli-page-holders'
import { cliPageOverview } from './cli-pages/cli-page-overview'
import { cliPagePreset } from './cli-pages/cli-page-preset'

const pages = [
  {
    id: 'overview',
    label: 'Overview',
    content: cliPageOverview,
  },
  {
    id: 'create-token',
    label: 'Create Token',
    content: cliPageCreateToken,
  },
  {
    id: 'close-token',
    label: 'Close Token',
    content: cliPageCloseToken,
  },
  {
    id: 'fee-payer',
    label: 'Fee Payer',
    content: cliPageFeePayer,
  },
  {
    id: 'holders',
    label: 'Holders',
    content: cliPageHolders,
  },
  {
    id: 'preset',
    label: 'Preset',
    content: cliPagePreset,
  },
]

export function CliFeature() {
  const sidebar: UserUiGridItem[] = [
    ...pages.map(({ label, id: path }) => ({
      label: path === 'overview' ? label : <UiGroup>{label}</UiGroup>,
      path,
      leftSection: path === 'overview' ? <IconDashboard size={16} /> : <IconTerminal size={16} />,
    })),
  ]
  const routes = useRoutes([
    { index: true, element: <Navigate to="./overview" replace /> },
    { path: ':id', element: <CliDetail /> },
  ])

  return (
    <HomeUiSidebarLayout routes={sidebar} basePath="/cli">
      {routes}
    </HomeUiSidebarLayout>
  )
}

export function CliDetail() {
  const { id } = useParams() as { id: string }
  const page = pages.find((p) => p.id === id)
  if (!page) {
    return <UiNotFound />
  }
  return (
    <TypographyStylesProvider className="cli-layout">
      <Markdown>{page.content}</Markdown>
    </TypographyStylesProvider>
  )
}
