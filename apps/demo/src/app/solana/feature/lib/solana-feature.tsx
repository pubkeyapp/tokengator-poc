import { UiGridRoutes, UiPage } from '@tokengator/ui';
import { ClusterUiSelect } from '../../../cluster/ui';
import { SolanaAccountInfoFeature } from './solana-account-info-feature';
import { SolanaCreateTokenFeature } from './solana-create-token-feature';

export default function SolanaFeature() {
  return (
    <UiPage title="Solana" rightAction={<ClusterUiSelect />}>
      <UiGridRoutes
        basePath="/solana"
        routes={[
          {
            label: 'Account Info',
            path: 'account-info',
            element: <SolanaAccountInfoFeature />,
          },
          {
            label: 'Create Token',
            path: 'create-token',
            element: <SolanaCreateTokenFeature />,
          },
        ]}
      />
    </UiPage>
  );
}
