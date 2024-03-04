import { Accordion, Anchor, Text } from '@mantine/core'
import { UiInfo, UiStack } from '@tokengator/ui'
import { PresetUiAppBusinessVisaHolders } from './preset-ui-app-business-visa-holders'
import { PresetUiAppBusinessVisaMint } from './preset-ui-app-business-visa-mint'
import { PresetUiAppBusinessVisaPresets } from './preset-ui-app-business-visa-presets'
import { PresetUiAppBusinessVisaVerify } from './preset-ui-app-business-visa-verify'

export function PresetUiAppBusinessVisa() {
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="presets">
          <Accordion.Control>Mint List</Accordion.Control>
          <Accordion.Panel>
            <UiStack>
              <UiInfo
                message={
                  <UiStack gap="xs">
                    <Text>This preset uses a fixed mint list to keep track of the mints.</Text>
                    <Text>
                      It will switch to using the{' '}
                      <Anchor href="https://spl.solana.com/token-2022/extensions#group">Group Extension</Anchor> once it
                      is available which will allow for dynamic minting.
                    </Text>
                  </UiStack>
                }
              />
              <PresetUiAppBusinessVisaPresets />
            </UiStack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="mint">
          <Accordion.Control>Mint token</Accordion.Control>
          <Accordion.Panel>
            <UiStack>
              <UiInfo
                message={
                  <UiStack gap="xs">
                    <Text>Select a user to mint a Business Visa for them.</Text>
                  </UiStack>
                }
              />
              <PresetUiAppBusinessVisaMint />
            </UiStack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="token-gate">
          <Accordion.Control>Verify ownership</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppBusinessVisaVerify />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Token holders</Accordion.Control>
          <Accordion.Panel>
            <PresetUiAppBusinessVisaHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}
