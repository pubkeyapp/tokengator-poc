import { Container, Text, Title } from '@mantine/core';
import { UiStack } from '@tokengator/ui';
import { ClusterUiModal, ClusterUiTable } from '../../ui';

export default function ClusterFeature() {
  return (
    <Container py="xl" my="xl">
      <UiStack align="center" gap="xl">
        <Title order={2}>Clusters</Title>
        <Text>Manage and select your Solana clusters</Text>
        <ClusterUiModal />
      </UiStack>

      <ClusterUiTable />
    </Container>
  );
}
