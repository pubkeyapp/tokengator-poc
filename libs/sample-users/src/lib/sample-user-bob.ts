import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserBob: SampleUser = {
  id: 'bob',
  name: 'Bob',
  keypairs: [
    // bob1AcFqVdKu2Wc4Me3ZU6GevoaB5yeLEE9J8MgPLS6
    Keypair.fromSecretKey(
      Uint8Array.from([
        11, 131, 152, 253, 143, 52, 143, 65, 213, 137, 186, 57, 105, 204, 230, 197, 120, 71, 250, 137, 112, 21, 120,
        253, 175, 190, 246, 183, 72, 139, 101, 250, 8, 234, 108, 57, 193, 192, 224, 70, 203, 154, 145, 202, 219, 148,
        148, 56, 161, 50, 141, 65, 227, 103, 41, 127, 231, 106, 70, 204, 164, 193, 64, 251,
      ]),
    ),
    // // bob2r1RsYNZjBCifaYskD7ZcdpQoQwWfRe8nzfpxmAA
    // Keypair.fromSecretKey(
    //   Uint8Array.from([
    //     47, 54, 68, 187, 113, 95, 18, 231, 31, 170, 152, 69, 187, 14, 157, 156, 92, 6, 55, 230, 198, 204, 77, 173, 76,
    //     177, 176, 56, 100, 193, 162, 69, 8, 234, 108, 94, 191, 145, 246, 137, 49, 231, 198, 53, 159, 66, 196, 100, 42,
    //     94, 183, 133, 240, 95, 78, 99, 232, 244, 23, 70, 196, 139, 228, 75,
    //   ]),
    // ),
  ],
}
