import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'
import { getBusinessVisaByOwner } from './get-business-visa-by-owner'
import { getMetadataMap } from './get-metadata-map'

export async function verifyBusinessVisa({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const mint = await getBusinessVisaByOwner({ owner, connection })
  if (!mint.length) {
    return { valid: false }
  }
  const mintAddress = mint[0]
  if (!mintAddress) {
    return { valid: false }
  }
  const tokenMetadata = await getTokenMetadata(
    connection,
    new PublicKey(mintAddress),
    'confirmed',
    TOKEN_2022_PROGRAM_ID,
  )

  const metadataMap: Record<string, string> = getMetadataMap(tokenMetadata?.additionalMetadata ?? [])

  const status = metadataMap['status']
  const expiresAt = metadataMap['expiresAt']

  if (!status || status === 'expired') {
    return { valid: false, status: 'expired', expiresAt: expiresAt.split('T')[0] }
  }

  if (expiresAt && new Date(expiresAt) < new Date()) {
    return { valid: false, status: 'expired', expiresAt: expiresAt.split('T')[0] }
  }

  return { valid: true, status, expiresAt: expiresAt.split('T')[0] }
}
