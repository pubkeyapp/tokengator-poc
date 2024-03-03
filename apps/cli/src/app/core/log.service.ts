import { Injectable } from '@nestjs/common'

@Injectable()
export class LogService {
  log(...args: any[]): void {
    console.log(...args)
  }

  error(...args: any[]): void {
    console.error(...args)
  }
}
