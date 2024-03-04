import { Connection, PublicKey } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { presetPayment } from './preset-payment'

export async function verifyPayment({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const minter = new Minter({ ...presetPayment.config })

  return connection
    .getParsedTokenAccountsByOwner(owner, {
      programId: minter.programId,
      mint: minter.mint.publicKey,
    })
    .then((res) => {
      return res.value.map((items) => items)
    })
    .then((items) => {
      return {
        valid: items.length > 0,
        items,
        amount: items.reduce((acc, item) => acc + item.account.data.parsed.info.tokenAmount.uiAmount, 0),
      }
    })
}
