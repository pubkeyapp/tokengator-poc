import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'

import { CloseTokenCommand } from './close-token.command'
import { CloseTokenQuestions } from './close-token.questions'

@Module({
  imports: [CoreModule],
  providers: [CloseTokenCommand, CloseTokenQuestions],
})
export class CloseTokenModule {}
