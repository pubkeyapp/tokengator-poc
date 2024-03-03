import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { FeePayerCommand } from './fee-payer.command'

@Module({
  imports: [CoreModule],
  providers: [FeePayerCommand],
})
export class FeePayerModule {}
