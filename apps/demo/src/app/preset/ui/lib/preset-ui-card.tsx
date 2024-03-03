import { Preset } from '@tokengator/presets'
import { UiCard, UiStack } from '@tokengator/ui'
import { ReactNode } from 'react'
import { PresetUiItem } from './preset-ui-item'

export function PresetUiCard({ children, preset, to }: { children?: ReactNode; preset: Preset; to?: string }) {
  return (
    <UiCard title={<PresetUiItem preset={preset} to={to} />}>
      <UiStack>{children}</UiStack>
    </UiCard>
  )
}
