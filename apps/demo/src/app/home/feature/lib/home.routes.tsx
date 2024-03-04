import { UiNotFound } from '@tokengator/ui'
import { Navigate, useRoutes } from 'react-router-dom'
import { CliFeature } from './cli-feature'
import { IntroductionFeature } from './introduction-feature'

export default function () {
  return useRoutes([
    { index: true, element: <Navigate to="/introduction" replace /> },
    { path: '/introduction', element: <IntroductionFeature /> },
    { path: '/cli/*', element: <CliFeature /> },
    { path: '*', element: <UiNotFound /> },
  ])
}
