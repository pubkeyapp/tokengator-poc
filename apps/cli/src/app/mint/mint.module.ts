import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'

import { MintCommand } from './mint.command'
import { MintQuestions } from './mint.questions'

@Module({
  imports: [CoreModule],
  providers: [MintCommand, MintQuestions],
})
export class MintModule {}
