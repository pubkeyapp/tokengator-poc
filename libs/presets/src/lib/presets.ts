import { Keypair, PublicKey } from '@solana/web3.js'
import { MinterConfig } from '@tokengator/minter'
import { presetBusinessVisa } from './preset-business-visa'
import { presetPayment } from './preset-payment'
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
  allocations?: PresetAllocation[]
}
export interface PresetRole {
  id: string
  name: string
  details: string[]
}
export interface PresetAllocation {
  amount: number
  destination: PublicKey
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

export const presets: Preset[] = [presetBusinessVisa, presetPayment, presetPreOrder]

export function findPreset(id: string) {
  const found = presets.find((p) => p.id === id)
  if (!found) {
    throw new Error('Invalid preset')
  }
  return found
}
