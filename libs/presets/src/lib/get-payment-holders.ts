import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { AccountInfo, Connection, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { presetPayment } from '@tokengator/presets'

export async function getPaymentHolders({ connection }: { connection: Connection }): Promise<PaymentHolder[]> {
  const minter = new Minter({ ...presetPayment.config })
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

export interface PaymentHolder {
  pubkey: PublicKey
  account: AccountInfo<ParsedAccountData>
}
