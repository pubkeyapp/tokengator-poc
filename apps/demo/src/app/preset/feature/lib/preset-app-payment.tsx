import { Accordion, Button, Group, Select, Table } from '@mantine/core'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPaymentHolders, mintPayment, Preset } from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { ellipsify, toastError, toastSuccess, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'

function useGetPaymentHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['payment-holders'],
    queryFn: async () => {
      return getPaymentHolders({ connection })
    },
  })
}

function useMintPayment({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-payment-holders'],
    mutationFn: async (destination: PublicKey) => {
      return mintPayment({ connection, destination, feePayer })
    },
  })
}

export function PresetAppPayment({ preset }: { preset: Preset }) {
  const query = useGetPaymentHolders()
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Payment token</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPaymentMint />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="holders">
          <Accordion.Control>Payment token Holders</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPaymentHolders />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </UiStack>
  )
}

export function PresetAppPaymentHolders() {
  const query = useGetPaymentHolders()
  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.length ? (
    <UiStack>
      <Group justify="flex-end">
        <Button onClick={() => query.refetch()}>Refresh</Button>
      </Group>
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
    <UiWarning message="No payment holders found" />
  )
}

export function PresetAppPaymentMint() {
  const { keypair } = useKeypair()
  const mutation = useMintPayment({ feePayer: keypair.solana as Keypair })
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
                toastSuccess(`Minted payment token: ${res}`)
              })
              .catch((err) => {
                toastError(`Failed to mint payment token: ${err.message}`)
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
