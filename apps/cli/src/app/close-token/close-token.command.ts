import { closeToken, Minter } from '@tokengator/minter'
import { findPreset, presets } from '@tokengator/presets'
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander'
import * as pc from 'picocolors'
import { CoreService } from '../core/core.service'

@Command({
  name: 'close-token',
  description: 'Close a token using a preset',
  arguments: '[preset]',
  argsDescription: {
    preset: `Available presets: ${presets.map((p) => p.id).join(', ')}`,
  },
})
export class CloseTokenCommand extends CommandRunner {
  constructor(private readonly core: CoreService, private readonly inquirer: InquirerService) {
    super()
  }

  async run(inputs: string[]) {
    const preset = await this.getPreset(inputs[0])

    const connection = await this.core.ensureConnection()
    this.core.logger.log(pc.cyan(`Creating token using preset: ${preset.name}`))

    const minter = new Minter(preset.config)
    const mint = await closeToken({ connection: connection, minter })
    if (typeof mint === 'string') {
      this.core.logger.log(`Token mint closed: ${pc.bold(mint)}`)
      this.core.logger.log(`${this.core.getExplorerUrl(`tx/${mint}`)}`)
    } else {
      this.core.logger.log(`Token mint closed: ${pc.bold(mint.address.toBase58())}`)
      this.core.logger.log(`${this.core.getExplorerUrl(`address/${mint.address.toBase58()}`)}`)
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
