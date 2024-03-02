import { Loader, Text, TextProps } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { useGetTokenBalance } from '../../data-access';
import { formatAmount } from './account-ui-form-send';

export function AccountUiTokenBalance({
  address,
  decimals,
  ...props
}: { decimals: number; address: PublicKey } & TextProps) {
  const query = useGetTokenBalance({ address });
  return query.isLoading ? (
    <Loader />
  ) : query.data ? (
    <Text {...props}>
      {formatAmount(query.data?.value.uiAmountString ?? '0')}
    </Text>
  ) : (
    <div>Error</div>
  );
}
