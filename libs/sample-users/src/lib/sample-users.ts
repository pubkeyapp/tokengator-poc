import { Keypair } from '@solana/web3.js'
import { sampleUserAlice } from './sample-user-alice'
import { sampleUserBob } from './sample-user-bob'
import { sampleUserCharlie } from './sample-user-charlie'
import { sampleUserDave } from './sample-user-dave'

export interface SampleUser {
  id: string
  name: string
  keypair: Keypair
}

export const sampleUsers: SampleUser[] = [sampleUserAlice, sampleUserBob, sampleUserCharlie, sampleUserDave]
