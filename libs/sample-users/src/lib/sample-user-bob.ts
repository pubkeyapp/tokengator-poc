import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserBob: SampleUser = {
  id: 'bob',
  name: 'Bob',
  keypair: Keypair.fromSecretKey(
    // bob1AcFqVdKu2Wc4Me3ZU6GevoaB5yeLEE9J8MgPLS6
    Uint8Array.from([
      11, 131, 152, 253, 143, 52, 143, 65, 213, 137, 186, 57, 105, 204, 230, 197, 120, 71, 250, 137, 112, 21, 120, 253,
      175, 190, 246, 183, 72, 139, 101, 250, 8, 234, 108, 57, 193, 192, 224, 70, 203, 154, 145, 202, 219, 148, 148, 56,
      161, 50, 141, 65, 227, 103, 41, 127, 231, 106, 70, 204, 164, 193, 64, 251,
    ]),
  ),
}
