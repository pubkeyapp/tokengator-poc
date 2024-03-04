import { Button, Group, Tabs } from '@mantine/core'
import { Minter } from '@tokengator/minter'
import { Preset, presets } from '@tokengator/presets'

import { UiDebugModal, UiError, UiLoader, UiStack } from '@tokengator/ui'
import { useParams } from 'react-router-dom'
import { useKeypair } from '../../../keypair/data-access'
import { useCloseToken, useCreateToken, useGetTokenMint } from '../../data-access'
import { PresetUiCard, PresetUiDetails, PresetUiMinter, PresetUiTokenGate } from '../../ui'
import { PresetApp } from './preset-app'

export function PresetDetailWrapper() {
  const { id } = useParams() as { id: string }

  const preset = presets.find((preset) => preset.id === id)

  if (!preset) {
    return <UiError message={`Preset not found: ${id}`} />
  }

  return <PresetDetailScreen preset={preset} />
}

export function PresetDetailScreen({ preset }: { preset: Preset }) {
  const { keypair } = useKeypair()
  const minter = new Minter({ ...preset.config, feePayer: keypair.solana })
  const query = useGetTokenMint({ minter })
  const createTokenMutation = useCreateToken({ minter })
  const closeTokenMutation = useCloseToken({ minter })

  return (
    <UiStack>
      <UiStack>
        <PresetUiCard preset={preset}>
          <Tabs variant="outline" defaultValue="overview">
            <Tabs.List mb="md">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="token-gate">Token Gate</Tabs.Tab>
              <Tabs.Tab value="mint-details">Mint Details</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              <PresetUiDetails preset={preset} />
            </Tabs.Panel>
            <Tabs.Panel value="token-gate">
              <PresetUiTokenGate preset={preset} />
            </Tabs.Panel>
            <Tabs.Panel value="mint-details">
              <PresetUiMinter preset={preset} />
            </Tabs.Panel>
          </Tabs>
        </PresetUiCard>
        {preset.id === 'business-visa' ? (
          <PresetApp preset={preset} minter={minter} />
        ) : query.isLoading ? (
          <UiLoader />
        ) : query.data ? (
          <UiStack>
            <PresetApp preset={preset} minter={minter} mint={query.data.mint} />
            <Group justify="flex-end">
              <Button
                variant="light"
                disabled={query.data.mint.mintAuthority?.toString() !== keypair.publicKey}
                loading={closeTokenMutation.isPending}
                onClick={() => closeTokenMutation.mutateAsync().then(() => query.refetch())}
              >
                Close Token
              </Button>
            </Group>
          </UiStack>
        ) : (
          <Group justify="flex-end">
            <Button
              loading={createTokenMutation.isPending}
              onClick={() => createTokenMutation.mutateAsync().then(() => query.refetch())}
            >
              Create Token
            </Button>
          </Group>
        )}
      </UiStack>
      <UiDebugModal data={preset} />
    </UiStack>
  )
}
