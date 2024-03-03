import { Module } from '@nestjs/common'
import { CloseTokenModule } from './close-token/close-token.module'
import { CoreModule } from './core/core.module'
import { CreateTokenModule } from './create-token/create-token.module'
import { FeePayerModule } from './fee-payer/fee-payer.module'
import { MintModule } from './mint/mint.module'
import { PresetModule } from './preset/preset.module'

@Module({
  imports: [CloseTokenModule, CreateTokenModule, CoreModule, FeePayerModule, MintModule, PresetModule],
})
export class CliModule {}
