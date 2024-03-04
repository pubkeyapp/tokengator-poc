import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserAlice: SampleUser = {
  id: 'alice',
  name: 'Alice',
  keypair: Keypair.fromSecretKey(
    // ALi1qDem73ayNd6pcQYrwQyMBnskdGmNFwgN5TNuJkZJ
    Uint8Array.from([
      128, 53, 250, 154, 94, 149, 186, 105, 46, 39, 179, 184, 51, 66, 158, 10, 89, 145, 101, 122, 220, 1, 43, 124, 128,
      62, 111, 130, 212, 180, 9, 57, 138, 197, 151, 191, 104, 131, 51, 236, 228, 21, 195, 142, 230, 16, 85, 149, 241,
      96, 54, 27, 146, 243, 145, 231, 238, 54, 7, 211, 173, 71, 21, 229,
    ]),
  ),
}
