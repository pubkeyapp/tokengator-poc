import { IconCube, IconDashboard } from '@tabler/icons-react'
import { presets } from '@tokengator/presets'
import { UiGroup, UiStack } from '@tokengator/ui'

import { Navigate, useRoutes } from 'react-router-dom'
import { PresetUiGridItem, PresetUiSidebarLayout } from '../../ui'
import { PresetDetailWrapper } from './preset-detail-feature'
import { PresetListFeature } from './preset-list-feature'

export default function PresetRoutes() {
  const sidebar: PresetUiGridItem[] = [
    {
      label: 'Overview',
      path: 'overview',
      leftSection: <IconDashboard size={16} />,
    },
    ...presets.map(({ name: label, id: path }) => ({
      label: <UiGroup>{label}</UiGroup>,
      path,
      leftSection: <IconCube size={16} />,
    })),
  ]
  const routes = useRoutes([
    { index: true, element: <Navigate to="./overview" replace /> },
    { path: 'overview', element: <PresetListFeature /> },
    { path: ':id', element: <PresetDetailWrapper /> },
  ])
  return (
    <UiStack>
      <PresetUiSidebarLayout basePath="/presets" routes={sidebar}>
        {routes}
      </PresetUiSidebarLayout>
    </UiStack>
  )
}
