import { Button, Group } from '@mantine/core'
import { Minter } from '@tokengator/minter'
import { Preset } from '@tokengator/presets'
import { UiCard, UiLoader, UiStack } from '@tokengator/ui'
import { useMemo } from 'react'
import { useKeypair } from '../../../../../keypair/data-access'
import { useCloseToken, useGetTokenHolders, useGetTokenMint } from '../../../../data-access'
import { PresetUiAppBusinessVisaCard } from './preset-ui-app-business-visa-card'

export function PresetUiAppBusinessVisaPresetDetail({ preset, close }: { preset: Preset; close: () => void }) {
  const { keypair } = useKeypair()
  const minter = new Minter({ ...preset.config, feePayer: keypair.solana })
  const query = useGetTokenMint({ minter })
  const holders = useGetTokenHolders({ minter })
  const closeTokenMutation = useCloseToken({ minter })

  const holderItems = useMemo(() => {
    return holders.data
  }, [holders.data, minter])

  return query.isLoading || holders.isLoading ? (
    <UiLoader />
  ) : query.data ? (
    <UiStack>
      <UiCard title={query.data?.metadata?.name ?? '...'} mb="md">
        {holderItems?.length ? (
          <UiStack>
            {holderItems?.map((holder) => (
              <UiStack key={holder.pubkey.toBase58()} gap="xs">
                <PresetUiAppBusinessVisaCard
                  refresh={() =>
                    holders
                      .refetch()
                      .then(() => query.refetch())
                      .then(() => holders.refetch())
                  }
                  minter={minter}
                  holder={holder}
                  metadata={[...(query.data.metadata?.additionalMetadata ?? [])]}
                />
              </UiStack>
            ))}
          </UiStack>
        ) : (
          <Group justify="flex-end">
            <Button
              loading={closeTokenMutation.isPending}
              onClick={() =>
                closeTokenMutation
                  .mutateAsync()
                  .then(() => {
                    return query.refetch()
                  })
                  .then(() => close())
              }
            >
              Close Token
            </Button>
          </Group>
        )}
      </UiCard>
    </UiStack>
  ) : (
    <Group justify="flex-end">Mint the Business Visa using the section below</Group>
  )
}
