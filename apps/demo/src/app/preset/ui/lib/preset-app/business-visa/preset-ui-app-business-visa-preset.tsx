import { Button, Group } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiStack } from '@tokengator/ui'
import { useState } from 'react'
import { PresetUiItem } from '../../preset-ui-item'

import { PresetUiAppBusinessVisaPresetDetail } from './preset-ui-app-business-visa-preset-detail'

export function PresetUiAppBusinessVisaPreset({ preset }: { preset: Preset }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <PresetUiItem preset={preset} key={preset.id} description={preset.config?.mint?.publicKey?.toString()}>
      <UiStack>
        <Group justify="flex-end">
          <Button variant="light" size="xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </Group>
        {showDetails && <PresetUiAppBusinessVisaPresetDetail preset={preset} close={() => setShowDetails(false)} />}
      </UiStack>
    </PresetUiItem>
  )
}
