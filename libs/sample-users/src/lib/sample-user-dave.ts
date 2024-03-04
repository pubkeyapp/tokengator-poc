import { Keypair } from '@solana/web3.js'
import { SampleUser } from './sample-users'

export const sampleUserDave: SampleUser = {
  id: 'dave',
  name: 'Dave',
  keypair: Keypair.fromSecretKey(
    // dav1w2JqQjwQczD76TpbytwrYnrVrHF194vhk8NzTab
    Uint8Array.from([
      20, 34, 167, 46, 170, 127, 254, 217, 97, 245, 11, 36, 195, 249, 75, 27, 28, 187, 203, 7, 36, 130, 185, 119, 152,
      254, 137, 144, 90, 123, 36, 58, 9, 95, 65, 129, 222, 72, 65, 108, 185, 234, 154, 129, 31, 177, 74, 152, 207, 85,
      88, 93, 248, 96, 88, 26, 13, 174, 56, 162, 136, 0, 205, 156,
    ]),
  ),
}
