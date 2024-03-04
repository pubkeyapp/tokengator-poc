import { Text } from '@mantine/core'
import { presets } from '@tokengator/presets'
import { UiCard, UiCardTitle, UiGroup, UiStack } from '@tokengator/ui'
import { PresetUiGrid } from '../../ui'

export function PresetListFeature() {
  return (
    <UiStack>
      <UiCard
        title={
          <UiGroup>
            <UiCardTitle>Presets</UiCardTitle>
          </UiGroup>
        }
      >
        <UiStack>
          <Text>There are {presets.length} presets that show various types of tokens.</Text>
        </UiStack>
      </UiCard>
      <PresetUiGrid presets={presets} />
    </UiStack>
  )
}
