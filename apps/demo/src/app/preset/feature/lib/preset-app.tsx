import { Mint } from '@solana/spl-token'
import { Minter } from '@tokengator/minter'
import { Preset } from '@tokengator/presets'
import { UiError } from '@tokengator/ui'
import { PresetPaymentProvider } from '../../data-access/lib/preset-payment-provider'
import { PresetAppBusinessVisa } from './preset-app-business-visa'
import { PresetAppPayment } from './preset-app-payment'
import { PresetAppPreOrder } from './preset-app-pre-order'

export function PresetApp({ preset, minter, mint }: { preset: Preset; minter: Minter; mint?: Mint }) {
  switch (preset.id) {
    case 'business-visa':
      return <PresetAppBusinessVisa preset={preset} />
    case 'payment':
      return (
        mint && (
          <PresetPaymentProvider mint={mint}>
            <PresetAppPayment preset={preset} minter={minter} mint={mint} />
          </PresetPaymentProvider>
        )
      )
    case 'pre-order':
      return mint && <PresetAppPreOrder preset={preset} minter={minter} mint={mint} />
    default:
      return <UiError message={`Preset app not found: ${preset.id}`} />
  }
}
