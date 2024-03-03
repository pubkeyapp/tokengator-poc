import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Command, CommandRunner, Option } from 'nest-commander'
import { CoreService } from '../core/core.service'

@Command({
  name: 'fee-payer',
  description: 'Get the public key of the fee payer',
})
export class FeePayerCommand extends CommandRunner {
  constructor(private readonly core: CoreService) {
    super()
  }

  async run() {
    const keypair = await this.core.getFeePayer()
    this.core.logger.log(`Public Key: ${keypair.publicKey.toString()}`)
    const conn = this.core.getConnection()
    const balance = await conn.getBalance(keypair.publicKey)
    this.core.logger.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`)
    this.core.logger.log(`${this.core.getExplorerUrl(`account/${keypair.publicKey.toString()}`)}`)
  }

  @Option({
    name: 'url',
    description: 'URL of the RPC endpoint',
    flags: '-u, --url <url>',
    choices: ['devnet', 'testnet', 'mainnet', 'local'],
    required: true,
  })
  setUrl(url: string) {
    this.core.setCluster(url)
  }
}
