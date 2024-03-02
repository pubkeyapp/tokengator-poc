import { Stack } from '@mantine/core';
import { UiLoader, UiWarning } from '@tokengator/ui';
import { ExplorerLink } from '../../../cluster/ui';
import { useSolanaGetAccountInfo } from '../../data-access';

import { SolanaUiAccountInfo } from './solana-ui-account-info';

export function SolanaUiGetAccountInfo({ address }: { address: string }) {
  const query = useSolanaGetAccountInfo({ address });

  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.value ? (
    <Stack gap={0}>
      <SolanaUiAccountInfo data={query.data.value} />
      <ExplorerLink size="xs" c="brand" path={`address/${address}`} />
    </Stack>
  ) : (
    <UiWarning message={`No data for address ${address}`} />
  );
}
