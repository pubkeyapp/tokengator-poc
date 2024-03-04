import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { BusinessVisaCommand } from './business-visa.command'

@Module({
  imports: [CoreModule],
  providers: [BusinessVisaCommand],
})
export class BusinessVisaModule {}
