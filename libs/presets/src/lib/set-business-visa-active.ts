import { Connection } from '@solana/web3.js'
import { Minter, updateTokenMinterMetadata } from '@tokengator/minter'
import { daysFromNow } from './preset-business-visa'

export function setBusinessVisaActive({ connection, minter }: { connection: Connection; minter: Minter }) {
  return updateTokenMinterMetadata({
    connection,
    minter,
    metadata: [
      ['status', 'active.'],
      ['expiresAt', new Date(daysFromNow(14)).toISOString()],
    ],
  })
}
