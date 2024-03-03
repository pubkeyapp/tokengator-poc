import { List } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiStack } from '@tokengator/ui'
import Markdown from 'react-markdown'

export function PresetUiDetails({ preset }: { preset: Preset }) {
  return (
    <UiStack>
      {preset.details?.length && (
        <List listStyleType="none" spacing="sm">
          {preset.details.map((detail) => (
            <List.Item key={detail}>
              <Markdown>{detail}</Markdown>
            </List.Item>
          ))}
        </List>
      )}
    </UiStack>
  )
}
