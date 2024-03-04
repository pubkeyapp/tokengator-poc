import { createUpdateFieldInstruction, Mint } from '@solana/spl-token'
import { Connection, sendAndConfirmTransaction, Transaction, TransactionInstruction } from '@solana/web3.js'
import { getTokenMint } from './get-token-mint'
import { Minter } from './minter'

export async function updateTokenMinterMetadata({
  connection,
  minter,
  metadata,
}: {
  connection: Connection
  minter: Minter
  metadata: [string, string][]
}): Promise<string | Mint> {
  console.log('Updating token minter metadata', minter, metadata)
  if (!minter.feePayer) {
    throw new Error('Fee payer is required')
  }
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }

  try {
    await getTokenMint({ connection, minter })
  } catch (e) {
    // ignore
    throw new Error('Token mint not found')
  }

  const transaction = new Transaction().add(...updateTokenMetadataInstructions({ metadata, minter: minter }))

  return sendAndConfirmTransaction(
    connection,
    transaction,
    [minter.feePayer], // Signers
    { skipPreflight: true },
  )
}

export function updateTokenMetadataInstructions({
  metadata,
  minter,
}: {
  metadata: [string, string][]
  minter: Minter
}): TransactionInstruction[] {
  // Validate the token minter configuration
  if (!minter.feePayer) {
    throw new Error('Fee payer is required')
  }
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }
  const programId = minter.programId
  const feePayerPublicKey = minter.feePayer.publicKey
  const mintPublicKey = minter.mint.publicKey

  const ix: TransactionInstruction[] = []

  for (const [field, value] of metadata ?? []) {
    console.log(`Updating metadata field: ${field} to ${value}`)
    ix.push(
      createUpdateFieldInstruction({
        programId,
        metadata: mintPublicKey,
        updateAuthority: minter.metadata?.updateAuthority ?? feePayerPublicKey,
        field,
        value,
      }),
    )
  }

  return ix
}
