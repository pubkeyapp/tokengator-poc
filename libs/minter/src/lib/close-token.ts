import { closeAccount, Mint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection } from '@solana/web3.js'
import { getTokenMint } from './get-token-mint'
import { Minter } from './minter'

export async function closeToken({
  connection,
  minter,
}: {
  connection: Connection
  minter: Minter
}): Promise<string | Mint> {
  if (!minter.feePayer) {
    throw new Error('Fee payer is required')
  }
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }

  try {
    await getTokenMint({ connection, minter })
  } catch (e) {
    throw new Error('Token mint not found')
  }

  return closeAccount(
    connection,
    minter.feePayer, // Transaction fee payer
    minter.mint.publicKey, // Mint Account address
    minter.closeAuthority ?? minter.feePayer.publicKey, // Account to receive lamports from closed account
    minter.closeAuthority ?? minter.feePayer.publicKey, // Close Authority for Mint Account
    undefined, // Additional signers
    undefined, // Confirmation options
    TOKEN_2022_PROGRAM_ID, // Token Extension Program ID
  )
}
