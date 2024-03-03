import { ExtensionType, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from '@solana/spl-token'
import { pack, TokenMetadata } from '@solana/spl-token-metadata'
import { Keypair, PublicKey } from '@solana/web3.js'
import { MinterConfig } from './minter-config'

function getDefaultMetadata(metadata: { name: string; symbol: string; image?: string; mint: PublicKey }) {
  const baseUrl = `https://metadata-tool.deno.dev/metadata`

  const { image, mint, name, symbol } = metadata

  return `${baseUrl}?name=${encodeURIComponent(name)}&symbol=${encodeURIComponent(symbol)}&mint=${mint}${
    image ? `&image=${encodeURIComponent(image)}` : ''
  }`
}

export class Minter {
  readonly extensions: ExtensionType[] = []
  private readonly mintKeypair: Keypair
  readonly programId: PublicKey
  constructor(private readonly config: MinterConfig = {}) {
    this.programId = TOKEN_2022_PROGRAM_ID
    this.mintKeypair = config.mint ?? Keypair.generate()
    this.config.decimals = config.decimals

    if (config.closeAuthority) {
      this.extensions.push(ExtensionType.MintCloseAuthority)
    }
    if (config.interest) {
      this.extensions.push(ExtensionType.InterestBearingConfig)
    }
    if (config.metadata) {
      this.extensions.push(ExtensionType.MetadataPointer)
    }
    if (config.nonTransferable) {
      this.extensions.push(ExtensionType.NonTransferable)
    }
    // if (config.transferFee) {
    //   this.extensions.push(ExtensionType.TransferFeeConfig)
    // }
  }

  extensionTypes() {
    return this.extensions.map((extension) => ExtensionType[extension])
  }

  get closeAuthority(): PublicKey | undefined {
    return this.config.closeAuthority
      ? typeof this.config.closeAuthority === 'boolean'
        ? this.feePayer?.publicKey
        : this.config.closeAuthority
      : undefined
  }
  get freezeAuthority(): PublicKey | undefined {
    return this.config.freezeAuthority ?? this.feePayer?.publicKey
  }

  get feePayer(): Keypair | undefined {
    return this.config.feePayer
  }

  get metadata(): (TokenMetadata & { image?: string }) | undefined {
    const mint = this.mint?.publicKey
    const updateAuthority = this.metadataUpdateAuthority
    const metadata = this.config.metadata
    if (!metadata || !mint) {
      return undefined
    }

    const additionalMetadata = metadata.additionalMetadata ?? []
    const image = metadata.image
    const name = metadata.name
    const symbol = metadata.symbol

    const uri = metadata.uri ?? getDefaultMetadata({ name, symbol, image, mint })

    return {
      additionalMetadata,
      mint,
      name,
      symbol,
      updateAuthority,
      uri,
      image,
    }
  }

  get metadataUpdateAuthority(): PublicKey | undefined {
    return this.config.metadata?.updateAuthority ?? this.feePayer?.publicKey
  }

  get metadataLen(): number {
    return this.metadata ? pack(this.metadata).length + TYPE_SIZE + LENGTH_SIZE : 0
  }

  get mint(): Keypair {
    return this.mintKeypair
  }

  get mintAuthority(): PublicKey | undefined {
    return this.config.authority ?? this.feePayer?.publicKey
  }

  get mintDecimals(): number {
    return this.config.decimals ?? 9
  }

  get mintLen(): number {
    return getMintLen(this.extensions)
  }

  get nonTransferable(): boolean {
    return this.config.nonTransferable || false
  }

  get rate(): number | undefined {
    return this.config.interest?.rate
  }

  get rateAuthority(): PublicKey | undefined {
    return this.config.interest?.rateAuthority ?? this.feePayer?.publicKey
  }
}
