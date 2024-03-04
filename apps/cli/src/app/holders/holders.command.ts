import { ParsedAccountData } from '@solana/web3.js'
import { getTokenHolders, Minter } from '@tokengator/minter'
import { findPreset, presets } from '@tokengator/presets'
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander'
import * as pc from 'picocolors'
import { CoreService } from '../core/core.service'

@Command({
  name: 'holders',
  description: 'Show token holders for a preset',
  arguments: '[preset]',
  argsDescription: {
    preset: `Available presets: ${presets.map((p) => p.id).join(', ')}`,
  },
})
export class HoldersCommand extends CommandRunner {
  constructor(private readonly core: CoreService, private readonly inquirer: InquirerService) {
    super()
  }

  async run(inputs: string[]) {
    const preset = await this.getPreset(inputs[0])

    const connection = await this.core.ensureConnection()
    this.core.logger.log(pc.cyan(`Creating token using preset: ${preset.name}`))

    const minter = new Minter(preset.config)

    const holders = await getTokenHolders({ connection, minter })

    this.core.logger.log(`Owner\t\t\t\t\t     | Token\t\t\t\t\t    | Mint\t\t\t\t\t   | Amount`)
    for (const holder of holders) {
      const data = (holder.account.data as ParsedAccountData).parsed
      const owner = data.info.owner
      const amount = data.info.tokenAmount.uiAmountString
      const mint = data.info.mint
      // console.log(JSON.stringify(data, null, 2))
      // console.log(JSON.stringify({ owner, token: holder.pubkey, mint, amount }, null, 2))
      // console.log(holder.account.data)
      this.core.logger.log(`${owner} | ${holder.pubkey} | ${mint} | ${amount}`)
    }
  }

  @Option({
    name: 'url',
    description: 'URL of the RPC endpoint',
    flags: '-u, --url <url>',
    choices: ['devnet', 'testnet', 'mainnet', 'local'],
    required: true,
  })
  setUrl(url: string) {
    this.core.setCluster(url)
  }

  private async getPreset(presetId?: string) {
    if (!presetId) {
      presetId = (await this.inquirer.ask<{ preset: string }>('close-token-questions', undefined)).preset
    } else {
      presetId = this.parsePreset(presetId)
    }
    return this.core.getPreset(presetId)
  }

  private parsePreset(val: string) {
    return findPreset(val).id
  }
}
