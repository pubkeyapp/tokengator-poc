import { Connection, PublicKey } from '@solana/web3.js'
import { getBusinessVisaByOwner } from './get-business-visa-by-owner'

export async function hasBusinessVisa({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const bvs = await getBusinessVisaByOwner({ connection, owner })

  return bvs.length > 0
}
