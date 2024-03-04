import { IconDashboard, IconUser } from '@tabler/icons-react'
import { sampleUsers as users } from '@tokengator/sample-users'
import { UiGroup, UiStack } from '@tokengator/ui'

import { Navigate, useRoutes } from 'react-router-dom'
import { UserUiGridItem, UserUiSidebarLayout } from '../../ui'
import { UserDetailWrapper } from './user-detail-feature'
import { UserListFeature } from './user-list-feature'

export default function UserRoutes() {
  const sidebar: UserUiGridItem[] = [
    {
      label: 'Overview',
      path: 'overview',
      leftSection: <IconDashboard size={16} />,
    },
    ...users.map(({ name: label, id: path }) => ({
      label: <UiGroup>{label}</UiGroup>,
      path,
      leftSection: <IconUser size={16} />,
    })),
  ]
  const routes = useRoutes([
    { index: true, element: <Navigate to="./overview" replace /> },
    { path: 'overview', element: <UserListFeature /> },
    { path: ':id', element: <UserDetailWrapper /> },
  ])
  return (
    <UiStack>
      <UserUiSidebarLayout basePath="/users" routes={sidebar}>
        {routes}
      </UserUiSidebarLayout>
    </UiStack>
  )
}
