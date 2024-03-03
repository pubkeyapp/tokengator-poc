import { Title } from '@mantine/core'
import { Preset, presets } from '@tokengator/presets'

import { UiDebug, UiError, UiStack } from '@tokengator/ui'
import { useParams } from 'react-router-dom'
import { PresetUiCard, PresetUiDetails, PresetUiMinter, PresetUiTokenGate } from '../../ui'

export function PresetDetailWrapper() {
  const { id } = useParams() as { id: string }

  const preset = presets.find((preset) => preset.id === id)

  if (!preset) {
    return <UiError message={`Preset not found: ${id}`} />
  }

  return <PresetDetailScreen preset={preset} />
}

export function PresetDetailScreen({ preset }: { preset: Preset }) {
  return (
    <UiStack>
      <UiStack gap={0}>
        <PresetUiCard preset={preset}>
          <Title order={3}>Details</Title>
          <PresetUiDetails preset={preset} />
          <PresetUiTokenGate preset={preset} />
          <PresetUiMinter preset={preset} />
        </PresetUiCard>
      </UiStack>
      <UiDebug data={preset} />
    </UiStack>
  )
}
