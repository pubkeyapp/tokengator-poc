import { Keypair } from '@solana/web3.js'
import { KEYPAIR_PRE } from './keypairs'
import { Preset } from './presets'

const kpPre = Keypair.fromSecretKey(Uint8Array.from(KEYPAIR_PRE))

export const presetPreOrder: Preset = {
  id: 'pre-order',
  name: 'Pre Order',
  description: 'Token with permanent delegate and Non-Transferable extensions.',
  details: [
    `In this example, we model the token for the [Solana Mobile Chapter 2 preorder](https://solana.fm/address/2DMMamkkxQ6zDMBtkFp8KH7FoWzBMBA1CGTYwom4QH6Z).`,
    `The token works as a Proof of Purchase, and the issuer has delegation over the token.`,
    `This enables the issuer to take the token back in exchange for a 'genesis token'.`,
  ],
  image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/saga-phone/image.png',
  metadata: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/saga-phone/metadata.json',
  roles: [{ id: 'pre-ordered', name: 'Pre-Ordered', details: ['You have a wallet that holds a Pre-Order token.'] }],
  config: {
    closeAuthority: true,
    nonTransferable: true,
    decimals: 0,
    metadata: {
      image: 'https://raw.githubusercontent.com/pubkeyapp/tokengator-assets/main/saga-phone/image.png',
      name: 'OPOS Pre-Order',
      symbol: 'PRE',
    },
    mint: kpPre,
  },
}
