import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { createToken, getTokenAccounts, Minter, mintTokens } from '@tokengator/minter'
import { getFirstFreeBusinessVisa } from './get-business-visa-holders'
import { getBusinessVisaMintList } from './get-business-visa-mint-list'
import { presetBusinessVisa } from './preset-business-visa'

export async function mintBusinessVisa({
  destination,
  connection,
  feePayer,
}: {
  destination: PublicKey
  connection: Connection
  feePayer: Keypair
}) {
  const found = await hasBusinessVisa({ owner: destination, connection })
  if (found) {
    throw new Error('Already has business visa')
  }
  const { count, mint } = await getFirstFreeBusinessVisa({ connection })
  if (!mint) {
    throw new Error('No free business visa found')
  }
  const minter = new Minter({
    ...presetBusinessVisa.config,
    metadata: {
      ...presetBusinessVisa.config.metadata,
      name: `${presetBusinessVisa.config.metadata?.name} #${count}`,
      symbol: `${presetBusinessVisa.config.metadata?.symbol}`,
    },
    mint,
    feePayer,
  })
  const token = await createToken({ connection, minter })
  console.log(`Token created: ${token}`)

  return mintTokens({
    amount: 1,
    connection,
    destination,
    minter,
  })
}

export async function hasBusinessVisa({ owner, connection }: { owner: PublicKey; connection: Connection }) {
  const mintList = getBusinessVisaMintList()
  const tokenAccounts = await getTokenAccounts({ connection, owner })

  const mints = tokenAccounts.value.map(({ account }) => {
    return account.data.parsed.info.mint
  })

  return mints.some((token) => mintList.includes(token))
}
