import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Minter, mintTokens } from '@tokengator/minter'
import { presetPreOrder } from '@tokengator/presets'

export async function mintPreOrder({
  destination,
  connection,
  feePayer,
}: {
  destination: PublicKey
  connection: Connection
  feePayer: Keypair
}) {
  const minter = new Minter({ ...presetPreOrder.config, feePayer })

  return mintTokens({
    amount: 1,
    connection,
    destination,
    minter,
  })
}
