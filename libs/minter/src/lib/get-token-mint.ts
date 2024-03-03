import { getMint, Mint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection } from '@solana/web3.js'
import { Minter } from './minter'

export async function getTokenMint({ connection, minter }: { connection: Connection; minter: Minter }): Promise<Mint> {
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }

  const found = await getMint(connection, minter.mint.publicKey, 'confirmed', TOKEN_2022_PROGRAM_ID)

  if (!found) {
    throw new Error('Token mint not found')
  }

  return found
}
