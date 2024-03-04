import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { AccountInfo, Connection, ParsedAccountData } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { presetPreOrder } from '@tokengator/presets'

export async function getPreOrderHolders({ connection }: { connection: Connection }) {
  const minter = new Minter({ ...presetPreOrder.config })
  const mint = minter.mint.publicKey.toString()

  return connection
    .getParsedProgramAccounts(TOKEN_2022_PROGRAM_ID, {
      commitment: 'confirmed',
      filters: [{ memcmp: { offset: 0, bytes: mint } }],
    })
    .then((items) => {
      return items.map((item) => ({
        ...item,
        account: item.account as AccountInfo<ParsedAccountData>,
      }))
    })
}
