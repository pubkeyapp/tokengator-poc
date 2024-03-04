import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserCharlie: SampleUser = {
  id: 'charlie',
  name: 'Charlie',
  keypair: Keypair.fromSecretKey(
    // cha1qVFJ4faAKanQoodpHci2ik2SEvUoMbHBuwDAmG5
    Uint8Array.from([
      104, 87, 227, 195, 19, 133, 255, 58, 193, 198, 143, 127, 217, 36, 215, 16, 159, 148, 36, 2, 42, 206, 143, 85, 97,
      207, 148, 62, 202, 245, 52, 124, 9, 37, 51, 56, 15, 132, 2, 148, 252, 4, 228, 32, 138, 246, 188, 100, 52, 188, 97,
      236, 7, 83, 9, 179, 118, 108, 151, 111, 140, 244, 191, 130,
    ]),
  ),
}
