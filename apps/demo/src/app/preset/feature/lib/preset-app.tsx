import { Preset } from '@tokengator/presets'
import { UiError } from '@tokengator/ui'
import { PresetAppBusinessVisa } from './preset-app-business-visa'
import { PresetAppPayment } from './preset-app-payment'
import { PresetAppPreOrder } from './preset-app-pre-order'

export function PresetApp({ preset }: { preset: Preset }) {
  switch (preset.id) {
    case 'business-visa':
      return <PresetAppBusinessVisa preset={preset} />
    case 'payment':
      return <PresetAppPayment preset={preset} />
    case 'pre-order':
      return <PresetAppPreOrder preset={preset} />
    default:
      return <UiError message={`Preset app not found: ${preset.id}`} />
  }
}
