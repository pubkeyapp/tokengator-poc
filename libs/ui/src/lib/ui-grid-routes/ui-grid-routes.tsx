import { Grid, GridColProps, GridProps, NavLink, NavLinkProps } from '@mantine/core'
import { ReactNode, Suspense, useMemo } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'
import { UiNotFound } from '../ui-not-found'
import { UiLoader } from '../ui-loader'

export interface UiGridRoute extends NavLinkProps {
  path: string
  label?: ReactNode
  element: ReactNode
}
export interface UiGridRoutesProps extends GridProps {
  basePath: string
  routes: UiGridRoute[]
  leftColProps?: GridColProps
  rightColProps?: GridColProps
}

export function UiGridRoutes({ basePath, routes, leftColProps, rightColProps, ...props }: UiGridRoutesProps) {
  const { pathname } = useLocation()

  const links = useMemo(
    () =>
      routes
        .filter((app) => app.label)
        .map(({ path, label, element, ...props }) => {
          const to = `${basePath}/${path}`
          return (
            <NavLink active={pathname.startsWith(to)} component={Link} key={path} label={label} to={to} {...props} />
          )
        }),
    [basePath, pathname, routes],
  )

  const router = useRoutes([
    { index: true, element: <Navigate to={routes[0].path} replace /> },
    ...routes.map((item) => ({ path: `${item.path}/*`, element: item.element })),
    { path: '*', element: <UiNotFound to={basePath} /> },
  ])

  return (
    <Grid {...props}>
      <Grid.Col span={{ base: 12, sm: 2 }} {...rightColProps}>
        {links}
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 10 }} {...leftColProps}>
        <Suspense fallback={<UiLoader />}>{router}</Suspense>
      </Grid.Col>
    </Grid>
  )
}
