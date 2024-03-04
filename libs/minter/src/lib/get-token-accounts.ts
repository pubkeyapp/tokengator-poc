import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'

export async function getTokenAccounts({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  return connection.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_2022_PROGRAM_ID,
  })
}
