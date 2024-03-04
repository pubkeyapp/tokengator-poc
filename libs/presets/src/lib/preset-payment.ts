import { Keypair } from '@solana/web3.js'
import { KEYPAIR_PAY } from './keypairs'
import { Preset } from './presets'

const kpPay = Keypair.fromSecretKey(Uint8Array.from(KEYPAIR_PAY))
export const presetPayment: Preset = {
  id: 'payment',
  name: 'Payment',
  description: 'Token with immutable ownership and transfer fees.',
  details: [
    `In this fictitious example, we model the concept of a person opening a payment account at an on-chain bank.`,
    `The issuer maintains full control over the token, and charges transfer fees.`,
  ],
  image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/global-payments/image.png',
  metadata: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/global-payments/metadata.json',
  roles: [{ id: 'owner', name: 'Owner', details: ['You have a wallet that holds a Payments token.'] }],
  config: {
    closeAuthority: true,
    nonTransferable: true,
    decimals: 9,
    metadata: {
      image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/global-payments/image.png',
      name: 'OPOS Payments',
      symbol: 'PAY',
    },
    mint: kpPay,
  },
}
