import { Button, Group, Text } from '@mantine/core'
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { ellipsify, toastError, UiKeyValueTable, UiStack, UiTime } from '@tokengator/ui'
import { uiToastLink } from '../../../../../account/data-access'
import { useCluster } from '../../../../../cluster/data-access'
import { AppLabelLink } from '../../../../../labels-provider'
import { useSetBusinessVisaActive, useSetBusinessVisaExpired } from '../../../../data-access'

export function PresetUiAppBusinessVisaCard({
  holder,
  metadata,
  minter,
  refresh,
}: {
  holder: { pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }
  metadata: [string, string][]
  minter: Minter
  refresh: () => void
}) {
  const { getExplorerUrl } = useCluster()
  const setActiveMutation = useSetBusinessVisaActive({ minter })
  const setExpiredMutation = useSetBusinessVisaExpired({ minter })

  const status = metadata.find(([key]) => key.toLowerCase() === 'status')?.[1]
  const expiresAt = metadata.find(([key]) => key.toLowerCase() === 'expiresat')?.[1]
  const isExpired = status?.toLowerCase() === 'expired'

  return (
    <UiStack>
      <UiKeyValueTable
        items={[
          ['Owner', <AppLabelLink publicKey={holder.account.data.parsed.info.owner} />],
          ['Account', <Text>{ellipsify(holder.pubkey.toBase58())}</Text>],
          ['Status', status?.replace('.', '')],
          ['Expires At', <UiTime date={new Date(expiresAt ?? '0')} />],
        ]}
      />
      <Group justify="flex-end">
        <Button
          loading={setActiveMutation.isPending}
          disabled={!isExpired}
          onClick={() => {
            setActiveMutation
              .mutateAsync()
              .then((signature) => {
                uiToastLink({ label: 'View on Explorer', link: getExplorerUrl(`/tx/${signature}`) })
                return refresh()
              })
              .catch((err) => {
                toastError(`Failed to set business visa active: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Set Active
        </Button>
        <Button
          loading={setExpiredMutation.isPending}
          disabled={isExpired}
          onClick={() => {
            setExpiredMutation
              .mutateAsync()
              .then((signature) => {
                uiToastLink({ label: 'View on Explorer', link: getExplorerUrl(`/tx/${signature}`) })
                return refresh()
              })
              .catch((err) => {
                toastError(`Failed to set business visa expired: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Set Expired
        </Button>
      </Group>
    </UiStack>
  )
}
