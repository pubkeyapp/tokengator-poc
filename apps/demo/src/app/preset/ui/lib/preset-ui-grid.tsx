import { SimpleGrid } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiAlert, UiAnchor } from '@tokengator/ui'
import { PresetUiCard } from './preset-ui-card'
import { PresetUiDetails } from './preset-ui-details'

export function PresetUiGrid({ presets }: { presets: Preset[] }) {
  return presets.length ? (
    <SimpleGrid cols={{ base: 0, lg: 3 }}>
      {presets?.map((item) => (
        <PresetUiCard key={item.id} preset={item} to={`/presets/${item.id}`}>
          <PresetUiDetails preset={item} />
          <UiAnchor ta="right" size="xs" to={`/presets/${item.id}`}>
            Read more...
          </UiAnchor>
        </PresetUiCard>
      ))}
    </SimpleGrid>
  ) : (
    <UiAlert title="No presets found" message="This is unexpected 😬" />
  )
}
