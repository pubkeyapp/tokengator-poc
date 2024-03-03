import { Title } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiStack } from '@tokengator/ui'
import { PresetUiRoles } from './preset-ui-roles'

export function PresetUiTokenGate({ preset }: { preset: Preset }) {
  return (
    <UiStack>
      <Title order={3}>Token Gate</Title>
      This structure allows for managing these roles:
      <PresetUiRoles roles={preset.roles} />
    </UiStack>
  )
}
