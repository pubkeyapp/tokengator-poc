import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Minter, mintTokens } from '@tokengator/minter'
import { presetPreOrder } from '@tokengator/presets'

export async function mintPreOrder({
  amount,
  destination,
  connection,
  feePayer,
}: {
  amount: number
  destination: PublicKey
  connection: Connection
  feePayer: Keypair
}) {
  const minter = new Minter({ ...presetPreOrder.config, feePayer })

  return mintTokens({
    amount,
    connection,
    destination,
    minter,
  })
}
