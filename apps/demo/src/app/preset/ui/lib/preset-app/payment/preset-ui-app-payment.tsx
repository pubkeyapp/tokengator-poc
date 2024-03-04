import { Accordion } from '@mantine/core'
import { UiStack } from '@tokengator/ui'
import { PresetUiAppPaymentHolders } from './preset-ui-app-payment-holders'
import { PresetUiAppPaymentMint } from './preset-ui-app-payment-mint'
import { PresetUiAppPaymentVerify } from './preset-ui-app-payment-verify'

export function PresetUiAppPayment() {
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint token</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPaymentMint />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="token-gate">
          <Accordion.Control>Verify ownership</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPaymentVerify />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Token holders</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPaymentHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}
