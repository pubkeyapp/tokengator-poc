import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { createToken, Minter, mintTokens } from '@tokengator/minter'
import { getFirstFreeBusinessVisa } from './get-business-visa-holders'
import { hasBusinessVisa } from './has-business-visa'
import { presetBusinessVisa } from './preset-business-visa'

export async function mintBusinessVisa({
  destination,
  connection,
  feePayer,
}: {
  destination: PublicKey
  connection: Connection
  feePayer: Keypair
}) {
  const found = await hasBusinessVisa({ owner: destination, connection })
  if (found) {
    throw new Error('Already has business visa')
  }
  const { count, mint } = await getFirstFreeBusinessVisa({ connection })
  if (!mint) {
    throw new Error('No free business visa found')
  }
  const minter = new Minter({
    ...presetBusinessVisa.config,
    metadata: {
      ...presetBusinessVisa.config.metadata,
      name: `${presetBusinessVisa.config.metadata?.name} #${count}`,
      symbol: `${presetBusinessVisa.config.metadata?.symbol}`,
    },
    mint,
    feePayer,
  })
  const createTokenTx = await createToken({ connection, minter })
  const mintTx = await mintTokens({
    amount: 1,
    connection,
    destination,
    minter,
  })

  return { createTokenTx, mintTx }
}
