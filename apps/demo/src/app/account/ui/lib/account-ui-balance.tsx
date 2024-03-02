import { Title, TitleProps } from '@mantine/core';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useGetBalance } from '../../data-access';

export function AccountUiBalance({
  address,
  ...props
}: { address: PublicKey } & TitleProps) {
  const query = useGetBalance({ address });

  function BalanceSol({ balance }: { balance: number }) {
    return (
      <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
    );
  }

  return (
    <Title onClick={() => query.refetch()} {...props}>
      {query.data ? <BalanceSol balance={query.data} /> : '...'} SOL
    </Title>
  );
}
