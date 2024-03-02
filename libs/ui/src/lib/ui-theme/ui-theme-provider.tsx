import { ColorSchemeScript, createTheme, DEFAULT_THEME, Loader, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, FunctionComponent, ReactNode, Suspense, useContext } from 'react'
import { UiColorSchemeProvider } from './ui-color-scheme-provider'

// Import the mantine theme styles
import './ui-theme-styles'

const theme = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  primaryColor: 'brand',
})

export type UiThemeLink = FunctionComponent<{
  children: ReactNode
  to: string
  target?: HTMLAnchorElement['target']
  rel?: HTMLAnchorElement['rel']
}>

export const defaultUiThemeLink: UiThemeLink = ({ children, ...props }) => (
  <a href={props.to} {...props}>
    {children}
  </a>
)

export interface UiThemeProviderContext {
  Link: UiThemeLink
}

const Context = createContext<UiThemeProviderContext>({} as UiThemeProviderContext)

export function UiThemeProvider({ children, link }: { children: ReactNode; link?: UiThemeLink }) {
  const value: UiThemeProviderContext = {
    Link: link ?? defaultUiThemeLink,
  }

  return (
    <Context.Provider value={value}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <UiColorSchemeProvider>
          <ModalsProvider>
            <Notifications />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </ModalsProvider>
        </UiColorSchemeProvider>
      </MantineProvider>
    </Context.Provider>
  )
}

export function useUiTheme() {
  return useContext(Context)
}
