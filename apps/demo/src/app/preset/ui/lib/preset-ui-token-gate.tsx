import { Preset } from '@tokengator/presets'
import { UiStack } from '@tokengator/ui'
import { PresetUiRoles } from './preset-ui-roles'

export function PresetUiTokenGate({ preset }: { preset: Preset }) {
  return (
    <UiStack>
      This structure allows for managing these roles:
      <PresetUiRoles roles={preset.roles} />
    </UiStack>
  )
}
