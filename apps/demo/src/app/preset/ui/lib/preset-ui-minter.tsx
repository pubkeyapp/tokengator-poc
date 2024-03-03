import { Avatar, Title } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { FactTypes, UiKeyValueTable, UiStack } from '@tokengator/ui'

export function PresetUiMinter({ preset }: { preset: Preset }) {
  const items: FactTypes = [
    [<strong>Mint</strong>, preset.config.mint?.publicKey.toString() ?? 'N/A'],
    ['Decimals', preset.config.decimals?.toString() ?? 'N/A'],
    ['Mint Authority', preset.config.feePayer?.publicKey.toString() ?? 'Fee Payer'],
    ['Close Authority', preset.config.closeAuthority ? 'Yes' : 'No'],
    // TODO: Support Delegate Authority
    // ['Delegate Authority', preset.config.delegateAuthority ? 'Yes' : 'No'],
    [<strong>Metadata</strong>, <div />],
    ['Name', preset.config.metadata?.name],
    ['Symbol', preset.config.metadata?.symbol],
    ['Image', preset.config.metadata?.image ? <Avatar src={preset.config.metadata?.image} /> : 'N/A'],
  ]
  return (
    <UiStack>
      <Title order={3}>Mint Details</Title>
      <UiKeyValueTable items={items} />
    </UiStack>
  )
}
