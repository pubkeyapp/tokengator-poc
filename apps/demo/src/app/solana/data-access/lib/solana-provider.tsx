import { AnchorProvider } from '@coral-xyz/anchor';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@pubkeyapp/wallet-adapter-mantine-ui';
import { WalletError } from '@solana/wallet-adapter-base';
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';

import { ReactNode, useCallback, useMemo } from 'react';
import { useCluster } from '../../../cluster/data-access';
import { UmiProvider } from './umi-provider';

export const WalletButton = WalletMultiButton;

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster();
  const endpoint = useMemo(() => cluster.endpoint, [cluster]);

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>
          <UmiProvider endpoint={endpoint}>{children}</UmiProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useAnchorProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();

  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: 'confirmed',
  });
}
