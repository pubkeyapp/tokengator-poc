import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { SampleUsersCommand } from './sample-users.command'

@Module({
  imports: [CoreModule],
  providers: [SampleUsersCommand],
})
export class SampleUsersModule {}
