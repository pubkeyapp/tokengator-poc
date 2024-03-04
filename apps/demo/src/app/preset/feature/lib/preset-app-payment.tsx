import { Accordion, Button, Group, Select, Table } from '@mantine/core'
import { Mint } from '@solana/spl-token'
import { Keypair } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { Preset } from '@tokengator/presets'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { ellipsify, toastError, toastSuccess, UiInfo, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../keypair/data-access'
import { usePresetPayment } from '../../data-access/lib/preset-payment-provider'
import { useMintPayment } from '../../data-access/lib/use-mint-payment'

export function PresetAppPayment({ preset, minter, mint }: { preset: Preset; minter: Minter; mint: Mint }) {
  return (
    <UiStack>
      <Accordion multiple variant="separated">
        <Accordion.Item value="mint">
          <Accordion.Control>Mint Payment token</Accordion.Control>
          <Accordion.Panel>
            <PresetAppPaymentMint mint={mint} />
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
  const { holders, isLoading, refresh } = usePresetPayment()
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
      )}
    </UiStack>
  )
}

export function PresetAppPaymentMint({ mint }: { mint: Mint }) {
  const { refresh } = usePresetPayment()
  const { keypair } = useKeypair()
  const mutation = useMintPayment({ feePayer: keypair.solana as Keypair })
  const [user, setUser] = useState<User | undefined>()

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
          loading={mutation.isPending}
          disabled={!user}
          onClick={() => {
            const destination = user?.keypairs.find((k) => k)?.publicKey
            if (!destination) {
              return
            }
            const amount = window.prompt('Enter amount', '100')
            if (!amount) {
              return
            }

            mutation
              .mutateAsync({ destination, amount: parseFloat(amount) })
              .then((res) => {
                refresh()
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
