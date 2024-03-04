import { Button, Group, Table } from '@mantine/core'
import { ellipsify, UiLoader, UiStack, UiWarning } from '@tokengator/ui'
import { AppLabelLink } from '../../../../../labels-provider'
import { usePresetPreOrder } from '../../../../data-access'

export function PresetUiAppPreOrderHolders() {
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
