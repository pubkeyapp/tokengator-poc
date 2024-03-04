import { Module } from '@nestjs/common'
import { BusinessVisaModule } from './business-visa/business-visa.module'
import { CloseTokenModule } from './close-token/close-token.module'
import { CoreModule } from './core/core.module'
import { CreateTokenModule } from './create-token/create-token.module'
import { FeePayerModule } from './fee-payer/fee-payer.module'
import { HoldersModule } from './holders/holders.module'
import { MintModule } from './mint/mint.module'
import { PresetModule } from './preset/preset.module'
import { SampleUsersModule } from './sample-users/sample-users.module'

@Module({
  imports: [
    BusinessVisaModule,
    CloseTokenModule,
    CreateTokenModule,
    CoreModule,
    FeePayerModule,
    HoldersModule,
    MintModule,
    PresetModule,
    SampleUsersModule,
  ],
})
export class CliModule {}
