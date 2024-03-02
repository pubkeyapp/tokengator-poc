import { Container } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { ellipsify, UiStack } from '@tokengator/ui';
import { useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { ExplorerLink } from '../../../cluster/ui';
import {
  AccountButtons,
  AccountUiBalance,
  AccountUiTokenTable,
  AccountUiTransactions,
} from '../../ui';

export function AccountDetailFeature() {
  const params = useParams();
  const address = useMemo(() => {
    if (!params.address) {
      return;
    }
    try {
      return new PublicKey(params.address);
    } catch (e) {
      console.log(`Invalid public key`, e);
    }
  }, [params]);
  if (!address) {
    return <div>Error loading account</div>;
  }

  return (
    <Container py="xl" my="xl">
      <UiStack align="center" gap="xl">
        <AccountUiBalance order={2} address={address} />
        <ExplorerLink
          path={`account/${address}`}
          label={ellipsify(address.toString())}
        />
        <AccountButtons address={address} />
      </UiStack>

      <UiStack>
        <AccountUiTokenTable
          address={address}
          burn={async () => {
            console.log('burn');
          }}
          send={async () => {
            console.log('send');
          }}
        />
        <AccountUiTransactions address={address} />
      </UiStack>
    </Container>
  );
}
