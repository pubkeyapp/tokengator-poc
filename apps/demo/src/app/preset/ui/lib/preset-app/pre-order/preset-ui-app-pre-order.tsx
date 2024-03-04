import { Accordion } from '@mantine/core'
import { UiStack } from '@tokengator/ui'
import { PresetUiAppPreOrderHolders } from './preset-ui-app-pre-order-holders'
import { PresetUiAppPreOrderMint } from './preset-ui-app-pre-order-mint'
import { PresetUiAppPreOrderVerify } from './preset-ui-app-pre-order-verify'

export function PresetUiAppPreOrder() {
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint token</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPreOrderMint />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="token-gate">
          <Accordion.Control>Verify ownership</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPreOrderVerify />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Token holders</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppPreOrderHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}
