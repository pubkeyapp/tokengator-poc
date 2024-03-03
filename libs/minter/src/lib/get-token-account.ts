import { getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'

export async function getTokenAccount({
  destination,
  connection,
  minter,
}: {
  destination: PublicKey
  connection: Connection
  minter: Minter
}) {
  if (!minter.feePayer) {
    throw new Error('Fee payer is required')
  }
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }

  return getOrCreateAssociatedTokenAccount(
    connection, // connection: Connection,
    minter.feePayer, // payer: Signer,
    minter.mint.publicKey, // mint: PublicKey,
    destination, // owner: PublicKey,
    undefined,
    'confirmed',
    undefined,
    TOKEN_2022_PROGRAM_ID,
  )
}
