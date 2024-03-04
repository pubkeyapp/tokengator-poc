import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserCharlie: SampleUser = {
  id: 'charlie',
  name: 'Charlie',
  keypairs: [
    // cha1qVFJ4faAKanQoodpHci2ik2SEvUoMbHBuwDAmG5
    Keypair.fromSecretKey(
      Uint8Array.from([
        104, 87, 227, 195, 19, 133, 255, 58, 193, 198, 143, 127, 217, 36, 215, 16, 159, 148, 36, 2, 42, 206, 143, 85,
        97, 207, 148, 62, 202, 245, 52, 124, 9, 37, 51, 56, 15, 132, 2, 148, 252, 4, 228, 32, 138, 246, 188, 100, 52,
        188, 97, 236, 7, 83, 9, 179, 118, 108, 151, 111, 140, 244, 191, 130,
      ]),
    ),
    // cha2hfdhz2TSJChENc2HVYrU6QpiiLrwe6fJpDoHhed
    Keypair.fromSecretKey(
      Uint8Array.from([
        33, 199, 44, 42, 218, 78, 42, 96, 194, 185, 103, 109, 196, 78, 53, 250, 44, 149, 33, 1, 228, 160, 94, 183, 54,
        135, 197, 42, 146, 107, 191, 166, 9, 37, 51, 75, 30, 64, 135, 109, 144, 130, 35, 120, 12, 39, 28, 89, 43, 244,
        224, 88, 64, 47, 217, 43, 70, 175, 222, 92, 90, 107, 201, 70,
      ]),
    ),
  ],
}
