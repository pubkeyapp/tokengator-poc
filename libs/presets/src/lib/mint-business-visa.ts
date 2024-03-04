import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { createToken, Minter, mintTokens } from '@tokengator/minter'
import { getFirstFreeBusinessVisa } from './get-business-visa-holders'
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
  const mint = await getFirstFreeBusinessVisa({ connection })
  if (!mint) {
    throw new Error('No free business visa found')
  }
  const minter = new Minter({ ...presetBusinessVisa.config, mint, feePayer })
  const token = await createToken({ connection, minter })
  console.log(`Token created: ${token}`)

  return mintTokens({
    amount: 1,
    connection,
    destination,
    minter,
  })
}
