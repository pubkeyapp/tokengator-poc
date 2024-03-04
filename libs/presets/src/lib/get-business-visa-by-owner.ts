import { Connection, PublicKey } from '@solana/web3.js'
import { getTokenAccounts } from '@tokengator/minter'
import { getBusinessVisaMintList } from './get-business-visa-mint-list'
import { PaymentHolder } from './get-payment-holders'

export async function getBusinessVisaByOwner({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const mintList = getBusinessVisaMintList()
  const tokenAccounts = await getTokenAccounts({ connection, owner })

  const mints: PaymentHolder[] = tokenAccounts.value
    .map(({ account }) => {
      return account?.data?.parsed?.info?.mint
    })
    .filter((mint) => mintList.includes(mint))

  return mints.length ? mints : []
}
