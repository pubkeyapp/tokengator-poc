import { Keypair } from '@solana/web3.js'
import { KEYPAIR_BUS } from './keypairs'
import { Preset } from './presets'

const kpBus = Keypair.fromSecretKey(Uint8Array.from(KEYPAIR_BUS))

export const presetBusinessVisa: Preset = {
  id: 'business-visa',
  name: 'Business Visa',
  description: 'Token with Non-Transferable extensions.',
  details: [
    `In this example, we model the concept of the 'Business Visa' used at Dean's List DAO.`,
    'A user buys a Business Visa which gives it access to a gated area for a fixed time, after which it expires.',
    'Once the user renews their expired visa, the metadata gets updated and they will regain access.',
  ],
  image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/image.png',
  metadata: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/metadata.json',
  roles: [
    {
      id: 'active',
      name: 'Active',
      details: ['You have a wallet that holds a Business Visa token.', 'The expiration date is in the future.'],
    },
    {
      id: 'expired',
      name: 'Expired',
      details: ['You have a wallet that holds a Business Visa token.', 'The expiration date is in the past.'],
    },
  ],
  config: {
    closeAuthority: true,
    nonTransferable: true,
    decimals: 0,
    metadata: {
      image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/developer-portal/image.png',
      name: 'OPOS Pre-Order',
      symbol: 'PRE',
    },
    mint: kpBus,
  },
}
