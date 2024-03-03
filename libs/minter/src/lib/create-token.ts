import {
  createInitializeInstruction,
  createInitializeInterestBearingMintInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMintCloseAuthorityInstruction,
  createInitializeMintInstruction,
  createInitializeNonTransferableMintInstruction,
  Mint,
} from '@solana/spl-token'
import {
  Connection,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { getTokenMint } from './get-token-mint'
import { Minter } from './minter'

export async function createToken({
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
    const found = await getTokenMint({ connection, minter })
    if (found) {
      return found
    }
  } catch (e) {
    // ignore
  }

  const lamports = await connection.getMinimumBalanceForRentExemption(minter.mintLen + minter.metadataLen)
  const transaction = new Transaction().add(...createTokenInstructions({ lamports, minter: minter }))

  return sendAndConfirmTransaction(
    connection,
    transaction,
    [minter.feePayer, minter.mint], // Signers
    { skipPreflight: true },
  )
}

export function createTokenInstructions({
  lamports,
  minter,
}: {
  lamports: number
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

  const closeAuthorityPublicKey = minter.closeAuthority
  const decimals = minter.mintDecimals ?? 9
  const freezeAuthorityPublicKey = minter.freezeAuthority ?? feePayerPublicKey
  const metadata = minter.metadata
  const mintAuthorityPublicKey = minter.mintAuthority ?? feePayerPublicKey
  const mintPublicKey = minter.mint.publicKey
  const nonTransferable = minter.nonTransferable
  const rateAuthority = minter.rateAuthority ?? feePayerPublicKey
  const rate = minter.rate
  const space = minter.mintLen

  const ix: TransactionInstruction[] = [
    SystemProgram.createAccount({
      fromPubkey: feePayerPublicKey,
      newAccountPubkey: mintPublicKey,
      space,
      lamports,
      programId,
    }),
  ]

  if (closeAuthorityPublicKey) {
    ix.push(
      createInitializeMintCloseAuthorityInstruction(
        mintPublicKey, // Mint Account address
        closeAuthorityPublicKey, // Designated Close Authority
        programId, // Token Extension Program ID
      ),
    )
  }
  if (nonTransferable) {
    ix.push(createInitializeNonTransferableMintInstruction(mintPublicKey, programId))
  }

  if (rate) {
    ix.push(createInitializeInterestBearingMintInstruction(mintPublicKey, rateAuthority, rate, programId))
  }

  if (metadata) {
    ix.push(
      createInitializeMetadataPointerInstruction(
        mintPublicKey, // Mint Account Address
        feePayerPublicKey, // Authority that can set the metadata address
        mintPublicKey, // Account address that holds the metadata
        programId, // Token Extension Program ID
      ),
    )
  }

  // Mint the token
  ix.push(
    createInitializeMintInstruction(
      mintPublicKey, // Mint Account Address
      decimals, // Decimals of Mint
      mintAuthorityPublicKey, // Designated Mint Authority
      freezeAuthorityPublicKey, // Optional Freeze Authority
      programId, // Token Extension Program ID
    ),
  )

  if (metadata) {
    ix.push(
      createInitializeInstruction({
        programId: programId, // Token Extension Program ID
        metadata: mintPublicKey, // Account address that holds the metadata
        updateAuthority: metadata.updateAuthority ?? feePayerPublicKey, // Authority that can update the metadata
        mint: mintPublicKey, // Mint Account Address
        mintAuthority: feePayerPublicKey, // Designated Mint Authority
        name: metadata.name, // Name of the token
        symbol: metadata.symbol, // Symbol of the token
        uri: metadata.uri, // URI of the token
      }),
    )
  }

  return ix
}
