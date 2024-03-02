import { useRoutes } from 'react-router-dom'
import { AccountDetailFeature } from './account-detail.feature'
import AccountListFeature from './account-list-feature'

export default function AccountRoutes() {
  return useRoutes([
    { index: true, element: <AccountListFeature /> },
    { path: ':address', element: <AccountDetailFeature /> },
  ])
}
