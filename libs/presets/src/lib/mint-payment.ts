import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Minter, mintTokens } from '@tokengator/minter'
import { presetPayment } from '@tokengator/presets'

export async function mintPayment({
  destination,
  connection,
  feePayer,
}: {
  destination: PublicKey
  connection: Connection
  feePayer: Keypair
}) {
  const minter = new Minter({ ...presetPayment.config, feePayer })
  const decimals = minter.mintDecimals
  const amount = Math.pow(10, decimals) * 100

  return mintTokens({
    amount,
    connection,
    destination,
    minter,
  })
}
