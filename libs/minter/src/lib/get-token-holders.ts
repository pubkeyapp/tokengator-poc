import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection } from '@solana/web3.js'
import { getTokenMint } from './get-token-mint'
import { Minter } from './minter'

export async function getTokenHolders({ connection, minter }: { connection: Connection; minter: Minter }) {
  if (!minter.mint) {
    throw new Error('Token mint is required')
  }

  const mint = await getTokenMint({ connection, minter })

  return connection.getParsedProgramAccounts(TOKEN_2022_PROGRAM_ID, {
    commitment: 'confirmed',
    filters: [{ memcmp: { offset: 0, bytes: mint.address.toString() } }],
  })
}
