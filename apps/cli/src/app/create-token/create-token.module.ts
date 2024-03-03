import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'

import { CreateTokenCommand } from './create-token.command'
import { CreateTokenQuestions } from './create-token.questions'

@Module({
  imports: [CoreModule],
  providers: [CreateTokenCommand, CreateTokenQuestions],
})
export class CreateTokenModule {}
