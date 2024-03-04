import { Accordion, Button, Group, Select, Table } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPreOrderHolders, mintPreOrder, Preset } from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { ellipsify, toastError, toastSuccess, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'

function useGetPreOrderHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['pre-order-holders'],
    queryFn: async () => {
      return getPreOrderHolders({ connection })
    },
  })
}

function useMintPreOrder({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-pre-order-holders'],
    mutationFn: async (destination: PublicKey) => {
      return mintPreOrder({ connection, destination, feePayer })
    },
  })
}

export function PresetAppPreOrder({ preset }: { preset: Preset }) {
  const query = useGetPreOrderHolders()
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Pre Order token</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPreOrderMint />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Pre Order token Holders</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPreOrderHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}

export function PresetAppPreOrderHolders() {
  const query = useGetPreOrderHolders()
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
        <UiWarning message="No pre-order holders found" />
      )}
    </UiStack>
  )
}

export function PresetAppPreOrderMint() {
  const { keypair } = useKeypair()
  const mutation = useMintPreOrder({ feePayer: keypair.solana as Keypair })
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
            const address = user?.keypairs.find((k) => k)?.publicKey
            if (!address) {
              return
            }

            mutation
              .mutateAsync(address)
              .then((res) => {
                toastSuccess(`Minted pre-order token: ${res}`)
              })
              .catch((err) => {
                toastError(`Failed to mint pre-order token: ${err.message}`)
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
