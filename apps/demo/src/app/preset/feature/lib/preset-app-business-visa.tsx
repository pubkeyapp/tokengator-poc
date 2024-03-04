import { Accordion, Button, Group, Select, Text } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getBusinessVisaHolders, getBusinessVisaPresets, mintBusinessVisa, Preset } from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { toastError, toastSuccess, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'
import { PresetUiItem } from '../../ui'

function useGetBusinessVisaHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['business-visa-holders'],
    queryFn: async () => {
      return getBusinessVisaHolders({ connection })
    },
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

export function PresetAppBusinessVisa({ preset }: { preset: Preset }) {
  const query = useGetBusinessVisaHolders()
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="presets">
          <Accordion.Control>Preset Business Visa Holders</Accordion.Control>
          <Accordion.Panel>
            <PresetAppBusinessVisaPresets />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Business Visa</Accordion.Control>
          <Accordion.Panel>
            <PresetAppBusinessVisaMint />
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
        <PresetUiItem preset={preset} key={preset.id} description={preset.config?.mint?.publicKey?.toString()} />
      ))}
    </UiStack>
  )
}

export function PresetAppBusinessVisaHolders() {
  const query = useGetBusinessVisaHolders()
  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.length ? (
    <UiStack>
      <Group justify="flex-end">
        <Button onClick={() => query.refetch()}>Refresh</Button>
      </Group>
      {query.data?.map((holder) => (
        <div key={holder.pubkey.toBase58()}>
          <Text>
            {holder.account.data.parsed.info.owner} | {holder.account.data.parsed.info.tokenAmount.uiAmountString}
          </Text>
          {holder.pubkey.toBase58()}
        </div>
      ))}
    </UiStack>
  ) : (
    <UiWarning message="No business visa holders found" />
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
          disabled={!user}
          onClick={() => {
            const address = user?.keypairs.find((k) => k)?.publicKey
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
