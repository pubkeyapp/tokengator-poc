import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Minter, mintTokens } from '@tokengator/minter'
import { presetPayment } from '@tokengator/presets'

export async function mintPayment({
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
  const minter = new Minter({ ...presetPayment.config, feePayer })
  const decimals = minter.mintDecimals

  return mintTokens({
    amount: Math.pow(10, decimals) * amount,
    connection,
    destination,
    minter,
  })
}
