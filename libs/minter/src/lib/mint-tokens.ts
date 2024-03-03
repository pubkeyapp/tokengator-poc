import { mintTo, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'
import { getTokenAccount } from './get-token-account'
import { Minter } from './minter'

export async function mintTokens({
  amount,
  destination,
  connection,
  minter,
}: {
  amount: number
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

  const tokenAccount = await getTokenAccount({ destination, connection, minter })

  return mintTo(
    connection,
    minter.feePayer, // Transaction fee payer
    minter.mint.publicKey, // Mint Account address
    tokenAccount.address, // Mint to
    minter.feePayer.publicKey, // Mint Authority address
    amount, // Amount
    undefined, // Additional signers
    undefined, // Confirmation options
    TOKEN_2022_PROGRAM_ID, // Token Extension Program ID
  )
}
