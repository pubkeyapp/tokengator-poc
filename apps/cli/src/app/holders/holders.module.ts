import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'

import { HoldersCommand } from './holders.command'
import { HoldersQuestions } from './holders.questions'

@Module({
  imports: [CoreModule],
  providers: [HoldersCommand, HoldersQuestions],
})
export class HoldersModule {}
