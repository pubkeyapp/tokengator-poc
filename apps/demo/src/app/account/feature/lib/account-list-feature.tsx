import { useWallet } from '@solana/wallet-adapter-react';
import { Navigate } from 'react-router-dom';
import { WalletButton } from '../../../solana/data-access';

export default function AccountListFeature() {
  const { publicKey } = useWallet();

  if (publicKey) {
    return <Navigate to={publicKey.toString()} replace />;
  }

  return <WalletButton />;
}
