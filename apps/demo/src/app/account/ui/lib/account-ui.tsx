import {
  Button,
  ButtonProps,
  Group,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { IconUserOff } from '@tabler/icons-react';
import { UiWarning } from '@tokengator/ui';
import { useState } from 'react';
import { useCluster } from '../../../cluster/data-access';
import {
  useGetBalance,
  useRequestAirdrop,
  useTransferSol,
} from '../../data-access';

export function AccountChecker() {
  const { publicKey } = useWallet();
  if (!publicKey) {
    return null;
  }
  return <AccountBalanceCheck address={publicKey} />;
}
export function AccountBalanceCheck({ address }: { address: PublicKey }) {
  const { cluster } = useCluster();
  const query = useGetBalance({ address });
  const requestAirdrop = useRequestAirdrop({ address });

  if (query.isLoading) {
    return null;
  }
  if (query.isError || !query.data) {
    return (
      <UiWarning
        styles={{
          root: { display: 'flex', justifyContent: 'center' },
          title: { justifyContent: 'center' },
        }}
        title="Account not found"
        icon={<IconUserOff size={24} />}
        message={
          <Group justify="center">
            <Text>
              You are connected to <strong>{cluster.name}</strong> but your
              account is not found on this cluster.
            </Text>
            <Button
              variant="light"
              color="yellow"
              size="xs"
              onClick={() =>
                requestAirdrop.mutateAsync('1').catch((err) => console.log(err))
              }
            >
              Request Airdrop
            </Button>
          </Group>
        }
      />
    );
  }
  return null;
}

export function AccountButtons({ address }: { address: PublicKey }) {
  const wallet = useWallet();
  const { cluster } = useCluster();

  return (
    <Group gap={2}>
      <ModalAirdrop
        disabled={cluster.network?.includes('mainnet')}
        address={address}
      />
      <ModalSend
        disabled={wallet.publicKey?.toString() !== address.toString()}
        address={address}
      />
      <ModalReceive address={address} />
    </Group>
  );
}

function ModalReceive({ address, ...props }: { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} {...props}>
        Receive
      </Button>
      <Modal opened={opened} onClose={close} title="Receive">
        <p>You can receive assets by sending them to your public key:</p>
        <code>{address.toString()}</code>
      </Modal>
    </>
  );
}

function ModalAirdrop({
  address,
  ...props
}: ButtonProps & { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false);
  const mutation = useRequestAirdrop({ address });
  const [amount, setAmount] = useState('2');

  return (
    <>
      <Button onClick={open} {...props}>
        Airdrop
      </Button>
      <Modal opened={opened} onClose={close} title="Airdrop">
        <TextInput
          disabled={mutation.isPending}
          type="number"
          step="any"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={!amount || mutation.isPending}
          onClick={() => {
            mutation
              .mutateAsync(amount)
              .then(() => close())
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Request Airdrop
        </Button>
      </Modal>
    </>
  );
}

function ModalSend({
  address,
  ...props
}: ButtonProps & { address: PublicKey }) {
  const [opened, { close, open }] = useDisclosure(false);
  const wallet = useWallet();
  const mutation = useTransferSol({ address });
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('1');

  if (!address || !wallet.sendTransaction) {
    return <div>Wallet not connected</div>;
  }

  return (
    <>
      <Button onClick={open} {...props}>
        Send
      </Button>
      <Modal opened={opened} onClose={close} title="Send">
        <TextInput
          disabled={mutation.isPending}
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextInput
          disabled={mutation.isPending}
          type="number"
          step="any"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={!destination || !amount || mutation.isPending}
          onClick={() => {
            mutation
              .mutateAsync({
                destination: new PublicKey(destination),
                amount,
              })
              .then(() => close());
          }}
        >
          Send
        </Button>
      </Modal>
    </>
  );
}

function ModalSendTokens({
  address,
  send,
  ...props
}: ButtonProps & {
  address: PublicKey;
  send: (input: { destination: PublicKey; amount: string }) => Promise<void>;
}) {
  const [opened, { close, open }] = useDisclosure(false);
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('1');

  return (
    <>
      <Button onClick={open} {...props}>
        Send
      </Button>
      <Modal opened={opened} onClose={close} title="Send">
        <TextInput
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <TextInput
          type="number"
          step="any"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={!destination || !amount}
          onClick={() => {
            send({
              destination: new PublicKey(destination),
              amount,
            }).then(() => close());
          }}
        >
          Send
        </Button>
      </Modal>
    </>
  );
}
