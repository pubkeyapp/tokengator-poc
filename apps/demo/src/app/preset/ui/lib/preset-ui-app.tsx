import { Mint } from '@solana/spl-token'
import { Preset } from '@tokengator/presets'
import { UiError } from '@tokengator/ui'
import { PresetPaymentProvider, PresetPreOrderProvider } from '../../data-access'
import { PresetUiAppBusinessVisa } from './preset-app/business-visa/preset-ui-app-business-visa'
import { PresetUiAppPayment } from './preset-app/payment/preset-ui-app-payment'
import { PresetUiAppPreOrder } from './preset-app/pre-order/preset-ui-app-pre-order'

export function PresetUiApp({ preset, mint }: { preset: Preset; mint?: Mint }) {
  switch (preset.id) {
    case 'business-visa':
      return <PresetUiAppBusinessVisa />
    case 'payment':
      return (
        mint && (
          <PresetPaymentProvider preset={preset} mint={mint}>
            <PresetUiAppPayment />
          </PresetPaymentProvider>
        )
      )
    case 'pre-order':
      return (
        mint && (
          <PresetPreOrderProvider preset={preset} mint={mint}>
            <PresetUiAppPreOrder />
          </PresetPreOrderProvider>
        )
      )
    default:
      return <UiError message={`Preset app not found: ${preset.id}`} />
  }
}
