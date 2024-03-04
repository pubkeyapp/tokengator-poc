import { PublicKey } from '@solana/web3.js'
import { Minter, mintTokens } from '@tokengator/minter'
import { findPreset, presets } from '@tokengator/presets'
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander'
import * as pc from 'picocolors'
import { CoreService } from '../core/core.service'

@Command({
  name: 'mint',
  description: 'Mint tokens using a preset',
  arguments: '[preset] [amount]',
  argsDescription: {
    amount: 'Amount of tokens to mint',
    preset: `Available presets: ${presets.map((p) => p.id).join(', ')}`,
  },
})
export class MintCommand extends CommandRunner {
  private destination?: PublicKey | undefined
  constructor(private readonly core: CoreService, private readonly inquirer: InquirerService) {
    super()
  }

  async run(inputs: string[]) {
    const presetId = inputs[0]
    if (!presetId) {
      throw new Error('Preset is required')
    }
    const amount = parseInt(inputs[1])
    if (!amount) {
      throw new Error('Amount is required')
    }

    const preset = await this.getPreset(inputs[0])

    const connection = await this.core.ensureConnection()
    this.core.logger.log(pc.cyan(`Creating token using preset: ${preset.name}`))

    const minter = new Minter(preset.config)
    const destination = this.destination ?? minter.feePayer?.publicKey

    this.core.logger.log(pc.cyan(`Minting ${amount} tokens to ${destination?.toBase58()}`))

    const tx = await mintTokens({ destination, minter, connection, amount })

    if (typeof tx === 'string') {
      this.core.logger.log(pc.green(`Transaction successful: ${pc.bold(tx)}`))
      this.core.logger.log(`${this.core.getExplorerUrl(`tx/${tx}`)}`)
    } else {
      this.core.logger.error(pc.red('Transaction failed'))
    }
  }

  @Option({
    name: 'destination',
    description: 'Destination address',
    flags: '-d, --destination <destination>',
    required: false,
  })
  setDestination(destination: string) {
    this.destination = destination.length ? new PublicKey(destination) : undefined
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
      presetId = (await this.inquirer.ask<{ preset: string }>('mint-questions', undefined)).preset
    } else {
      presetId = this.parsePreset(presetId)
    }
    return this.core.getPreset(presetId)
  }

  private parsePreset(val: string) {
    return findPreset(val).id
  }
}
