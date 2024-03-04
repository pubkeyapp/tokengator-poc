import { Button, Group, Table } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import { ellipsify, UiKeyValueTable, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { useGetBusinessVisaHolders, useGetTokenMetadata } from '../../../../data-access'

export function PresetUiAppBusinessVisaHolders() {
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
                <Table.Th>Address</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Metadata</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {query.data?.map((holder) => {
                console.log(holder.account.data)
                console.log(holder.account.data.parsed.info.mint)
                return (
                  <Table.Tr key={holder.pubkey.toBase58()}>
                    <Table.Td>{ellipsify(holder.account.data.parsed.info.owner)}</Table.Td>
                    <Table.Td>{holder.account.data.parsed.info.tokenAmount.uiAmountString}</Table.Td>
                    <Table.Td>{ellipsify(holder.pubkey.toBase58())}</Table.Td>
                    <Table.Td>
                      <GetBusinessVisaMetadata address={holder.account.data.parsed.info.mint} />
                    </Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        </UiStack>
      ) : (
        <UiWarning message="No business visa holders found" />
      )}
    </UiStack>
  )
}

function GetBusinessVisaMetadata({ address }: { address: PublicKey }) {
  const query = useGetTokenMetadata({ address })
  console.log('query.data, ', query.data, address.toString())
  return query.isLoading ? (
    <UiLoader type="dots" size="xs" />
  ) : query.data ? (
    <UiKeyValueTable items={query.data.additionalMetadata ?? []} />
  ) : (
    'N/A'
  )
}
