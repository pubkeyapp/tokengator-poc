import { UiCard, UiStack } from '@tokengator/ui';
import { useState } from 'react';
import { SolanaUiAddressInput, SolanaUiGetAccountInfo } from '../../ui';

export function SolanaAccountInfoFeature() {
  const [address, setAddress] = useState('');

  return (
    <UiCard>
      <UiStack>
        <SolanaUiAddressInput address={address} setAddress={setAddress} />
        {address?.length ? <SolanaUiGetAccountInfo address={address} /> : null}
      </UiStack>
    </UiCard>
  );
}
