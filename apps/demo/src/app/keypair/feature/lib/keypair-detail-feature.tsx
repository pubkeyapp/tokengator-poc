import { Group } from '@mantine/core';

import { Keypair } from '@solana/web3.js';
import { UiCopy, UiStack } from '@tokengator/ui';
import { useKeypairTokenOperations } from '../../../account/data-access';
import {
  AccountUiBalance,
  AccountUiTokenTable,
  AccountUiTransactions,
} from '../../../account/ui';
import { ExplorerLink } from '../../../cluster/ui';

export function KeypairDetailScreen({ keypair }: { keypair: Keypair }) {
  const address = keypair.publicKey;
  const { burnTokens, closeAccount, sendTokens } = useKeypairTokenOperations({
    keypair,
  });

  return (
    <UiStack>
      <UiStack gap={0}>
        <AccountUiBalance address={address} />
        <Group>
          <UiCopy text={address.toString()} />
          <ExplorerLink
            ff="monospace"
            label={address.toString()}
            path={`account/${address}`}
          />
        </Group>
      </UiStack>
      <AccountUiTokenTable
        address={address}
        burn={burnTokens}
        close={closeAccount}
        send={sendTokens}
      />
      <AccountUiTransactions address={address} />
    </UiStack>
  );
}
