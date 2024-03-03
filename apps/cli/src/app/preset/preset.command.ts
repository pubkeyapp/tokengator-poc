import { Command, CommandRunner } from 'nest-commander'
import { CoreService } from '../core/core.service'
import { PresetListCommand } from './preset-list.command'

@Command({
  name: 'preset',
  subCommands: [PresetListCommand],
})
export class PresetCommand extends CommandRunner {
  constructor(private readonly core: CoreService) {
    super()
  }

  async run() {
    this.core.logger.log(this.command.help())
  }
}
