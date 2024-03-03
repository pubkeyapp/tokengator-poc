import { Module } from '@nestjs/common'
import { CoreService } from './core.service'
import { LogService } from './log.service'

@Module({
  providers: [CoreService, LogService],
  exports: [CoreService, LogService],
})
export class CoreModule {}
