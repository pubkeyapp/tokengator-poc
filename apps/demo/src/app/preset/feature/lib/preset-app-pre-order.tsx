import { Accordion, Button, Group, Select, Table } from '@mantine/core'
import { Mint } from '@solana/spl-token'
import { useConnection } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Minter } from '@tokengator/minter'
import { getPreOrderHolders, mintPreOrder, Preset, verifyPreOrder } from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { ellipsify, toastError, toastSuccess, toastWarning, UiInfo, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'
import { AppLabelLink } from '../../../labels-provider'
import { usePresetPreOrder } from '../../data-access/lib/preset-pre-order-provider'

function useGetPreOrderHolders() {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['pre-order-holders'],
    queryFn: async () => {
      return getPreOrderHolders({ connection })
    },
    retry: false,
  })
}

function useMintPreOrder({ feePayer }: { feePayer: Keypair }) {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['mint-pre-order-holders'],
    mutationFn: async ({ amount, destination }: { amount: number; destination: PublicKey }) => {
      return mintPreOrder({ amount, connection, destination, feePayer })
    },
  })
}

function useVerifyPreOrder() {
  const { connection } = useConnection()
  return useMutation({
    mutationKey: ['verify-pre-order-holders'],
    mutationFn: async (owner: PublicKey) => {
      return verifyPreOrder({ connection, owner })
    },
  })
}

export function PresetAppPreOrder({ preset, minter, mint }: { preset: Preset; minter: Minter; mint: Mint }) {
  const query = useGetPreOrderHolders()
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Pre Order token</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPreOrderMint mint={mint} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="token-gate">
          <Accordion.Control>Verify Pre Order token ownership</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPreOrderVerify mint={mint} />
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
  const { holders, isLoading, refresh } = usePresetPreOrder()
  return (
    <UiStack>
      <Group justify="flex-end">
        <Button variant="light" onClick={refresh}>
          Refresh
        </Button>
      </Group>
      {isLoading ? (
        <UiLoader />
      ) : holders?.length ? (
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
              {holders?.map((holder) => (
                <Table.Tr key={holder.pubkey.toBase58()}>
                  <Table.Td>
                    <AppLabelLink publicKey={holder.account.data.parsed.info.owner} />
                  </Table.Td>
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

export function PresetAppPreOrderVerify({ mint }: { mint: Mint }) {
  const mutation = useVerifyPreOrder()
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
          loading={mutation.isPending}
          onClick={() => {
            const address = user?.keypair.publicKey
            if (!address) {
              return
            }

            mutation
              .mutateAsync(address)
              .then((res) => {
                if (res.valid) {
                  toastSuccess(`Verified: ${user.name} has ${res.amount} tokens`)
                } else {
                  toastWarning(`User ${user.name} has no pre-order tokens`)
                }
              })
              .catch((err) => {
                toastError(`Failed to verify pre-order token: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Verify
        </Button>
      </Group>
    </UiStack>
  )
}

export function PresetAppPreOrderMint({ mint }: { mint: Mint }) {
  const { keypair } = useKeypair()
  const mutation = useMintPreOrder({ feePayer: keypair.solana as Keypair })
  const [user, setUser] = useState<User | undefined>()

  const { refresh } = usePresetPreOrder()
  if (mint.mintAuthority?.toString() !== keypair.publicKey) {
    return <UiInfo message={`You are not the mint authority for this token`} />
  }

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
          loading={mutation.isPending}
          onClick={() => {
            const destination = user?.keypair.publicKey
            if (!destination) {
              return
            }

            const amount = window.prompt('Enter amount', '1')
            if (!amount) {
              return
            }
            mutation
              .mutateAsync({ destination, amount: parseFloat(amount) })
              .then((res) => {
                refresh()
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
