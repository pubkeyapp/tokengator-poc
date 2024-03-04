import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserAlice: SampleUser = {
  id: 'alice',
  name: 'Alice',
  keypairs: [
    // ALi1qDem73ayNd6pcQYrwQyMBnskdGmNFwgN5TNuJkZJ
    Keypair.fromSecretKey(
      Uint8Array.from([
        128, 53, 250, 154, 94, 149, 186, 105, 46, 39, 179, 184, 51, 66, 158, 10, 89, 145, 101, 122, 220, 1, 43, 124,
        128, 62, 111, 130, 212, 180, 9, 57, 138, 197, 151, 191, 104, 131, 51, 236, 228, 21, 195, 142, 230, 16, 85, 149,
        241, 96, 54, 27, 146, 243, 145, 231, 238, 54, 7, 211, 173, 71, 21, 229,
      ]),
    ),
    // ALi2ioQBFdoj1ygBXxmK4BTDQQ9ErU5eTR8Tt3DNN7ua
    Keypair.fromSecretKey(
      Uint8Array.from([
        56, 241, 208, 175, 39, 31, 10, 22, 140, 98, 77, 189, 210, 166, 144, 65, 115, 21, 197, 100, 142, 181, 9, 185, 18,
        189, 21, 245, 153, 96, 173, 125, 138, 197, 156, 47, 165, 199, 196, 224, 230, 99, 9, 81, 169, 181, 178, 137, 202,
        29, 113, 58, 78, 31, 160, 211, 217, 227, 212, 142, 116, 211, 9, 217,
      ]),
    ),
  ],
}
