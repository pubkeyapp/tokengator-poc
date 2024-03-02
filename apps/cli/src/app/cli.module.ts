import { Module } from '@nestjs/common';

import { BasicCommand } from './commands/basic-command';
import { LogService } from './log.service';

@Module({
  providers: [LogService, BasicCommand],
})
export class CliModule {}
