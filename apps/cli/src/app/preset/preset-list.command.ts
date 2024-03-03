import { CommandRunner, SubCommand } from 'nest-commander'
import * as pc from 'picocolors'
import { CoreService } from '../core/core.service'

@SubCommand({ name: 'list' })
export class PresetListCommand extends CommandRunner {
  constructor(private readonly core: CoreService) {
    super()
  }

  async run() {
    const presets = await this.core.getPresets()
    this.core.logger.log('Available presets:')

    for (const preset of presets) {
      this.core.logger.log(` - ${preset.name} ${pc.dim(`[${preset.id}]`)}`)
      this.core.logger.log(`   ${pc.dim(preset.description)}`)
    }
  }
}
