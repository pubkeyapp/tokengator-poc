import { getBusinessVisaPresets } from '@tokengator/presets'
import { UiStack } from '@tokengator/ui'

import { PresetUiAppBusinessVisaPreset } from './preset-ui-app-business-visa-preset'

export function PresetUiAppBusinessVisaPresets() {
  const presets = getBusinessVisaPresets()
  return (
    <UiStack>
      {presets?.map((preset) => (
        <PresetUiAppBusinessVisaPreset key={preset.id} preset={preset} />
      ))}
    </UiStack>
  )
}
