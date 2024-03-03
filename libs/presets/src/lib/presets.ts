import { Keypair } from '@solana/web3.js'
import { MinterConfig } from '@tokengator/minter'
import { presetBusinessVisa } from './preset-business-visa'
import { presetPayments } from './preset-payments'
import { presetPreOrder } from './preset-pre-order'

export interface Preset {
  id: string
  name: string
  description: string
  details: string[]
  image: string
  metadata: string
  roles: PresetRole[]
  config: MinterConfig
}
export interface PresetRole {
  id: string
  name: string
  details: string[]
}

export function getPresetsWithFeePayer(feePayer: Keypair): Preset[] {
  return presets.map((preset) => {
    return {
      ...preset,
      config: {
        ...preset.config,
        feePayer: feePayer,
      },
    }
  })
}

export const presets: Preset[] = [presetBusinessVisa, presetPayments, presetPreOrder]

export function findPreset(id: string) {
  const found = presets.find((p) => p.id === id)
  if (!found) {
    throw new Error('Invalid preset')
  }
  return found
}
