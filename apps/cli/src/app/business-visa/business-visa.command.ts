import { ParsedAccountData } from '@solana/web3.js'
import { findPreset, getBusinessVisaHolders } from '@tokengator/presets'
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander'
import { CoreService } from '../core/core.service'

@Command({
  name: 'business-visa',
  description: 'Show token holders for business visa',
})
export class BusinessVisaCommand extends CommandRunner {
  constructor(private readonly core: CoreService, private readonly inquirer: InquirerService) {
    super()
  }

  async run(inputs: string[]) {
    const connection = await this.core.ensureConnection()
    const holders = await getBusinessVisaHolders({ connection })

    this.core.logger.log(`Owner\t\t\t\t\t     | Token\t\t\t\t\t    | Mint\t\t\t\t\t   | Amount`)
    for (const holder of holders) {
      const data = (holder.account.data as ParsedAccountData).parsed
      const owner = data.info.owner
      const amount = data.info.tokenAmount.uiAmountString
      const mint = data.info.mint

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
