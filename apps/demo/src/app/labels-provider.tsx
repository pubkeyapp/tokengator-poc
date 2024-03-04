import { Group, Text, TextProps } from '@mantine/core'
import { presets } from '@tokengator/presets'
import { sampleUsers } from '@tokengator/sample-users'
import { ellipsify, UiAnchor, UiCopy } from '@tokengator/ui'
import { createContext, ReactNode, useContext } from 'react'

export interface Label {
  name: string
  publicKey: string
}

export interface LabelsProviderContext {
  name: string
  labels: Label[]
  labelMap: Map<string, Label>
  getLabel: (publicKey: string) => Label | undefined
}

const Context = createContext<LabelsProviderContext>({} as LabelsProviderContext)

const labels: Label[] = [
  ...sampleUsers.map((i) => ({ name: i.name, publicKey: i.keypair.publicKey.toString() })),
  ...presets.map((p) => ({ name: p.name, publicKey: p.config.mint?.publicKey.toString() ?? '' })),
]
const labelMap = new Map<string, Label>(labels.map((i) => [i.publicKey, i]))

export function LabelsProvider({ children }: { children: ReactNode }) {
  const value: LabelsProviderContext = {
    name: 'Labels',
    labels,
    labelMap,
    getLabel: (publicKey: string) => labelMap.get(publicKey),
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLabels() {
  return useContext(Context)
}

export function AppLabel({ publicKey, ...props }: TextProps & { publicKey: string }) {
  const { getLabel } = useLabels()

  return <Text {...props}>{getLabel(publicKey)?.name ?? ellipsify(publicKey)}</Text>
}

export function AppLabelLink({ publicKey, to }: { publicKey: string; to?: string }) {
  return (
    <UiAnchor to={to}>
      <Group gap="xs" align="center">
        <UiCopy text={publicKey} />
        <AppLabel publicKey={publicKey} />
      </Group>
    </UiAnchor>
  )
}
