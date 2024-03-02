import { ActionIcon, Anchor, Button, Group, Table, Text } from '@mantine/core';
import { IconCurrencySolana, IconTrash } from '@tabler/icons-react';
import { UiAlert, UiDebugModal } from '@tokengator/ui';
import { useKeypair } from '../../data-access';

export function KeypairUiTable() {
  const { keypairs, generateKeypair, setKeypair, deleteKeypair } = useKeypair();

  return keypairs.length ? (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Public Key</Table.Th>
          <Table.Th align="center">Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {keypairs?.map((item) => (
          <Table.Tr key={item.name}>
            <Table.Td>
              <Text size="lg">
                {item?.active ? (
                  item.name
                ) : (
                  <Anchor
                    component="button"
                    title="Select keypair"
                    onClick={() => setKeypair(item)}
                  >
                    {item.name}
                  </Anchor>
                )}
              </Text>
              <Text c="dimmed" size="xs">
                {item.publicKey}
              </Text>
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <ActionIcon disabled={!item.solana} size="sm" variant="light">
                  <IconCurrencySolana />
                </ActionIcon>
                <UiDebugModal data={item} />
                <ActionIcon
                  size="sm"
                  variant="light"
                  disabled={item.active}
                  onClick={() => {
                    if (!window.confirm('Are you sure?')) return;
                    deleteKeypair(item);
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  ) : (
    <UiAlert
      title="No keypairs found"
      message={
        <Button onClick={() => generateKeypair()}>Generate Keypair</Button>
      }
    />
  );
}
