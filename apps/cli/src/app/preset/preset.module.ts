import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { PresetListCommand } from './preset-list.command'
import { PresetCommand } from './preset.command'

@Module({
  imports: [CoreModule],
  providers: [PresetCommand, PresetListCommand],
})
export class PresetModule {}
