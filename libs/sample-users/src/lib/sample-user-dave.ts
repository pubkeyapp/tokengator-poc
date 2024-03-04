import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserDave: SampleUser = {
  id: 'dave',
  name: 'Dave',
  keypairs: [
    // dav1w2JqQjwQczD76TpbytwrYnrVrHF194vhk8NzTab
    Keypair.fromSecretKey(
      Uint8Array.from([
        20, 34, 167, 46, 170, 127, 254, 217, 97, 245, 11, 36, 195, 249, 75, 27, 28, 187, 203, 7, 36, 130, 185, 119, 152,
        254, 137, 144, 90, 123, 36, 58, 9, 95, 65, 129, 222, 72, 65, 108, 185, 234, 154, 129, 31, 177, 74, 152, 207, 85,
        88, 93, 248, 96, 88, 26, 13, 174, 56, 162, 136, 0, 205, 156,
      ]),
    ),
    // // dav23F8kNo3J7E1B79q1uKrvsgP1AXu9pWeACPj5myf
    // Keypair.fromSecretKey(
    //   Uint8Array.from([
    //     122, 53, 7, 244, 125, 229, 82, 144, 224, 151, 93, 199, 142, 29, 6, 226, 156, 64, 5, 179, 94, 248, 241, 173, 153,
    //     7, 20, 0, 180, 99, 3, 81, 9, 95, 65, 132, 59, 36, 84, 248, 195, 163, 183, 213, 239, 254, 41, 29, 84, 55, 84, 56,
    //     90, 65, 10, 135, 91, 134, 138, 231, 160, 110, 142, 70,
    //   ]),
    // ),
  ],
}
