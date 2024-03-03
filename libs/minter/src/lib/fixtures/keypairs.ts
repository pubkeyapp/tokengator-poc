import { Keypair } from '@solana/web3.js'

export const fixtureMintKeypair = Keypair.fromSecretKey(
  Uint8Array.from(
    // tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg
    [
      107, 193, 227, 247, 65, 195, 106, 157, 179, 163, 188, 223, 80, 87, 19, 33, 144, 236, 127, 3, 55, 26, 74, 174, 230,
      40, 13, 253, 186, 192, 217, 128, 13, 32, 79, 249, 222, 152, 88, 91, 215, 168, 57, 230, 141, 192, 86, 131, 77, 9,
      116, 223, 104, 127, 3, 158, 226, 22, 208, 187, 191, 96, 163, 47,
    ],
  ),
)
export const fixtureFeePayerKeypair = Keypair.fromSecretKey(
  Uint8Array.from(
    // FEESzCoiEmPyHoAc9bDJaMiDS5K9Gxew1f84wphB8j7Z
    [
      169, 81, 58, 77, 119, 191, 103, 21, 130, 21, 194, 42, 62, 51, 30, 250, 102, 193, 187, 225, 238, 1, 6, 96, 29, 248,
      183, 49, 58, 93, 116, 140, 211, 103, 95, 140, 53, 254, 23, 137, 30, 58, 207, 5, 49, 147, 21, 22, 137, 206, 81,
      205, 145, 226, 0, 104, 4, 10, 14, 149, 83, 99, 113, 220,
    ],
  ),
)
