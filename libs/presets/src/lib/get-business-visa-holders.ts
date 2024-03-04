import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { AccountInfo, Connection, Keypair, ParsedAccountData, PublicKey } from '@solana/web3.js'
import { getBusinessVisaMintList } from './get-business-visa-mint-list'
import { businessVisas } from './keypairs'
import { presetBusinessVisa } from './preset-business-visa'
import { Preset } from './presets'

export async function getBusinessVisaHolders({ connection }: { connection: Connection }) {
  const mintList = getBusinessVisaMintList()
  const found: {
    pubkey: PublicKey
    account: AccountInfo<ParsedAccountData>
  }[] = []

  for (let i = 0; i < mintList.length; i++) {
    const mint = mintList[i]
    const holders = await connection.getParsedProgramAccounts(TOKEN_2022_PROGRAM_ID, {
      commitment: 'confirmed',
      filters: [{ memcmp: { offset: 0, bytes: mint } }],
    })
    found.push(...holders.map((h) => ({ pubkey: h.pubkey, account: h.account as AccountInfo<ParsedAccountData> })))
  }
  return found
}

export function getBusinessVisaPresets(): Preset[] {
  return Object.keys(businessVisas).map((id: string, index: number) => ({
    ...presetBusinessVisa,
    id: `${presetBusinessVisa.id}-${index}`,
    name: `${presetBusinessVisa.name} #${index}`,
    config: {
      ...presetBusinessVisa.config,
      metadata: {
        ...presetBusinessVisa.config.metadata,
        symbol: `${presetBusinessVisa.config.metadata?.symbol}`,
        name: `${presetBusinessVisa.config.metadata?.name} #${index}`,
      },
      mint: Keypair.fromSecretKey(Uint8Array.from(businessVisas[id as keyof typeof businessVisas])),
    },
  }))
}

export async function getFirstFreeBusinessVisa({ connection }: { connection: Connection }): Promise<{
  count: number
  mint?: Keypair
}> {
  const mintList = getBusinessVisaMintList()
  // We are looking for the first mint that has no holders
  for (let i = 0; i < mintList.length; i++) {
    const mint = mintList[i]
    const holders = await connection.getParsedProgramAccounts(TOKEN_2022_PROGRAM_ID, {
      commitment: 'confirmed',
      filters: [{ memcmp: { offset: 0, bytes: mint } }],
    })
    if (!holders.length) {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(businessVisas[mint as keyof typeof businessVisas]))

      return { count: holders.length, mint: keypair }
    }
  }
  return { count: 0, mint: undefined }
}
