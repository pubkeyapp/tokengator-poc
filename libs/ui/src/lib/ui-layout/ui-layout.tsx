import { AppShell, AppShellProps, Loader, rem } from '@mantine/core'
import { ReactNode, Suspense } from 'react'

export function UiLayout({
  children,
  header,
  footer,
  headerHeight = rem(56),
  footerHeight = rem(56),
  ...props
}: Omit<AppShellProps, 'header' | 'footer'> & {
  children: ReactNode
  header: ReactNode
  footer?: ReactNode
  headerHeight?: string
  footerHeight?: string
}) {
  return (
    <AppShell
      header={{ height: headerHeight }}
      footer={footer ? { height: footerHeight } : undefined}
      padding="md"
      {...props}
    >
      <AppShell.Header>{header}</AppShell.Header>

      <AppShell.Main>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AppShell.Main>
      {footer && <AppShell.Footer>{footer}</AppShell.Footer>}
    </AppShell>
  )
}
