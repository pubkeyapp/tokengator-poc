import { Connection, PublicKey } from '@solana/web3.js'
import { Minter } from '@tokengator/minter'
import { presetPreOrder } from './preset-pre-order'

export async function verifyPreOrder({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const minter = new Minter({ ...presetPreOrder.config })

  return connection
    .getParsedTokenAccountsByOwner(owner, {
      programId: minter.programId,
      mint: minter.mint.publicKey,
    })
    .then((res) => {
      console.log(res)
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
