import { Accordion, Anchor, Button, Group, Select, Table, Text } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { AccountInfo, Keypair, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getTokenHolders, Minter } from '@tokengator/minter'
import {
  getBusinessVisaHolders,
  getBusinessVisaPresets,
  mintBusinessVisa,
  Preset,
  setBusinessVisaActive,
  setBusinessVisaExpired,
} from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import {
  ellipsify,
  toastError,
  toastSuccess,
  UiCard,
  UiInfo,
  UiKeyValueTable,
  UiLoader,
  UiStack,
  UiTime,
  UiWarning,
} from '@tokengator/ui'
import { useMemo, useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'
import { AppLabelLink } from '../../../labels-provider'
import { useCloseToken, useGetTokenMint } from '../../data-access'
import { PresetUiItem } from '../../ui'

function useGetBusinessVisaHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['business-visa-holders'],
    queryFn: async () => {
      return getBusinessVisaHolders({ connection })
    },
    retry: false,
  })
}

function useGetTokenHolders({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['business-visa-holders', { minter }],
    queryFn: async () => {
      return getTokenHolders({ connection, minter })
    },
    retry: false,
  })
}

function useMintBusinessVisa({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-business-visa-holders'],
    mutationFn: async (destination: PublicKey) => {
      return mintBusinessVisa({ connection, destination, feePayer })
    },
  })
}

function useSetBusinessVisaExpired({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['setBusinessVisaExpired', { minter }],
    mutationFn: async () => setBusinessVisaExpired({ connection, minter }),
  })
}

function useSetBusinessVisaActive({ minter }: { minter: Minter }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['setBusinessVisaActive', { minter }],
    mutationFn: async () => setBusinessVisaActive({ connection, minter }),
  })
}

export function PresetAppBusinessVisa({ preset }: { preset: Preset }) {
  const query = useGetBusinessVisaHolders()
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="presets">
          <Accordion.Control>Preset Business Visa Holders</Accordion.Control>
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
              <PresetAppBusinessVisaPresets />
            </UiStack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Business Visa</Accordion.Control>
          <Accordion.Panel>
            <UiStack>
              <UiInfo
                message={
                  <UiStack gap="xs">
                    <Text>Select a user to mint a Business Visa for them.</Text>
                  </UiStack>
                }
              />
              <PresetAppBusinessVisaMint />
            </UiStack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Business Visa Holders</Accordion.Control>
          <Accordion.Panel>
            <PresetAppBusinessVisaHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}

export function PresetAppBusinessVisaPresets() {
  const presets = getBusinessVisaPresets()
  return (
    <UiStack>
      {presets?.map((preset) => (
        <PresetAppBusinessVisaPreset key={preset.id} preset={preset} />
      ))}
    </UiStack>
  )
}

export function PresetAppBusinessVisaPreset({ preset }: { preset: Preset }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <PresetUiItem preset={preset} key={preset.id} description={preset.config?.mint?.publicKey?.toString()}>
      <UiStack>
        <Group justify="flex-end">
          <Button variant="light" size="xs" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </Group>
        {showDetails && <PresetAppBusinessVisaPresetDetail preset={preset} close={() => setShowDetails(false)} />}
      </UiStack>
    </PresetUiItem>
  )
}

export function PresetAppBusinessVisaPresetDetail({ preset, close }: { preset: Preset; close: () => void }) {
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
                <SingleBusinessVisa
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

function SingleBusinessVisa({
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
              .then(() => {
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
              .then(() => {
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

export function PresetAppBusinessVisaHolders() {
  const query = useGetBusinessVisaHolders()
  return (
    <UiStack>
      <Group justify="flex-end">
        <Button variant="light" onClick={() => query.refetch()}>
          Refresh
        </Button>
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data?.length ? (
        <UiStack>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Owner</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Address</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {query.data?.map((holder) => (
                <Table.Tr key={holder.pubkey.toBase58()}>
                  <Table.Td>{ellipsify(holder.account.data.parsed.info.owner)}</Table.Td>
                  <Table.Td>{holder.account.data.parsed.info.tokenAmount.uiAmountString}</Table.Td>
                  <Table.Td>{ellipsify(holder.pubkey.toBase58())}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </UiStack>
      ) : (
        <UiWarning message="No business visa holders found" />
      )}
    </UiStack>
  )
}

export function PresetAppBusinessVisaMint() {
  const { keypair } = useKeypair()
  const mutation = useMintBusinessVisa({ feePayer: keypair.solana as Keypair })
  const [user, setUser] = useState<User | undefined>()
  return (
    <UiStack>
      <Select
        data={users.map((user) => ({ value: user.id, label: user.name }))}
        label="User"
        placeholder="Select user"
        value={user?.id}
        onChange={(value) => setUser(value ? users.find((u) => u.id === value) : undefined)}
      />
      <Group justify="flex-end">
        <Button
          loading={mutation.isPending}
          disabled={!user}
          onClick={() => {
            const address = user?.keypair.publicKey
            if (!address) {
              return
            }

            mutation
              .mutateAsync(address)
              .then((res) => {
                toastSuccess(`Minted business visa: ${res}`)
              })
              .catch((err) => {
                toastError(`Failed to mint business visa: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Mint
        </Button>
      </Group>
    </UiStack>
  )
}
