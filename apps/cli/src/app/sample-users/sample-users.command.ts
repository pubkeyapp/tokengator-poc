import { findPreset } from '@tokengator/presets'
import { sampleUsers } from '@tokengator/sample-users'
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander'
import * as pc from 'picocolors'
import { CoreService } from '../core/core.service'

@Command({
  name: 'sample-users',
  description: 'Find the sample users',
})
export class SampleUsersCommand extends CommandRunner {
  constructor(private readonly core: CoreService, private readonly inquirer: InquirerService) {
    super()
  }

  async run() {
    const users = this.getSampleUsers()

    this.core.logger.log(pc.cyan('Sample users:'))
    for (const user of users) {
      this.core.logger.log(pc.bold(` - ${user.id}`))
      for (const keypair of user.keypairs) {
        this.core.logger.log(pc.bold(`   - ${keypair.publicKey}`))
      }
    }
  }

  @Option({
    name: 'url',
    description: 'URL of the RPC endpoint',
    flags: '-u, --url <url>',
    choices: ['devnet', 'testnet', 'mainnet', 'local'],
    required: false,
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

  private getSampleUsers() {
    return sampleUsers
  }
}
