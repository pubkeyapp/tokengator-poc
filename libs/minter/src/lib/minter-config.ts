import { TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair, PublicKey } from '@solana/web3.js'

export interface MinterBaseConfig {
  authority?: PublicKey
  decimals?: number
  feePayer?: Keypair
  mint?: Keypair
}

export interface MinterMetadataConfig extends Omit<TokenMetadata, 'additionalMetadata' | 'mint' | 'uri'> {
  additionalMetadata?: [string, string][]
  image?: string
  name: string
  symbol: string
  updateAuthority?: PublicKey
  mintAuthority?: PublicKey
  uri?: string
}
export interface MinterInterestConfig {
  rate: number
  rateAuthority?: PublicKey
}
export interface MinterTransferFeeConfig {
  transferFeeRate: number
  transferFeeAccount: string
}

export interface MinterConfig extends MinterBaseConfig {
  closeAuthority?: boolean | PublicKey
  freezeAuthority?: PublicKey
  metadata?: MinterMetadataConfig
  interest?: MinterInterestConfig
  nonTransferable?: boolean
  // transferFee?: MinterTransferFeeConfig
}
