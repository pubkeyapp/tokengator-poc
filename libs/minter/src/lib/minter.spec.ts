import { ExtensionType, getExtensionTypes, getMint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { createToken } from './create-token'
import { fixtureFeePayerKeypair, fixtureMintKeypair } from './fixtures/keypairs'
import { generateCommands } from './generate-commands'
import { Minter } from './minter'

describe('Minter', () => {
  const url = 'http://localhost:8899'
  const connection = new Connection(url, 'confirmed')
  const feePayer = fixtureFeePayerKeypair

  beforeAll(async () => {
    await ensureBalance({ connection, publicKey: feePayer.publicKey, amount: 2 })
  })

  describe('generateCommands', () => {
    it('should configure a token with no config', () => {
      // ACT
      const minter = new Minter()

      // ASSERT
      expect(minter.programId).toBe(TOKEN_2022_PROGRAM_ID)
      expect(minter.feePayer?.secretKey).toBeUndefined()
      expect(minter.feePayer?.publicKey).toBeUndefined()
      expect(minter.mint?.secretKey).toBeDefined()
      expect(minter.mint?.publicKey).toBeDefined()
      expect(minter.mintDecimals).toEqual(9)
      expect(minter.mintLen).toEqual(82)
      expect(minter.metadata).toBeUndefined()

      expect(minter.extensionTypes()).toMatchInlineSnapshot(`[]`)
      // expect(generateCommands({ minter, url }).join(' ')).toMatchInlineSnapshot(
      //   `"spl-token -u http://localhost:8899 -p TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --decimals 9 ./Gg6MkvQ3Rc7Fw63BZAwdLCNavY6mfpUcxV3aJgvzmcyN.json"`,
      // )
    })
    it('should configure a token with basic config', () => {
      // ARRANGE
      const decimals = 6
      const mint = fixtureMintKeypair

      // ACT
      const minter = new Minter({
        decimals,
        mint,
      })

      // ASSERT
      expect(minter.programId).toBe(TOKEN_2022_PROGRAM_ID)
      expect(minter.feePayer?.secretKey).toBeUndefined()
      expect(minter.feePayer?.publicKey).toBeUndefined()
      expect(minter.metadata).toBeUndefined()
      expect(minter.mint?.secretKey).toStrictEqual(mint.secretKey)
      expect(minter.mint?.publicKey).toStrictEqual(mint.publicKey)
      expect(minter.mint?.publicKey.toString()).toBe('tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg')
      expect(minter.mintDecimals).toBe(decimals)
      expect(minter.mintLen).toEqual(82)

      expect(minter.extensionTypes()).toMatchInlineSnapshot(`[]`)
      expect(generateCommands({ minter, url }).join(' ')).toMatchInlineSnapshot(
        `"spl-token -u http://localhost:8899 -p TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --decimals 6 ./tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg.json"`,
      )
    })

    it('should configure a token with basic config and fee payer', () => {
      // ARRANGE
      const decimals = 6
      const feePayer = fixtureFeePayerKeypair
      const mint = fixtureMintKeypair

      // ACT
      const minter = new Minter({
        decimals,
        feePayer,
        mint,
      })

      // ASSERT
      expect(minter.programId).toBe(TOKEN_2022_PROGRAM_ID)
      expect(minter.feePayer?.secretKey).toStrictEqual(feePayer.secretKey)
      expect(minter.feePayer?.publicKey).toStrictEqual(feePayer.publicKey)
      expect(minter.metadata).toBeUndefined()
      expect(minter.mint?.secretKey).toStrictEqual(mint.secretKey)
      expect(minter.mint?.publicKey).toStrictEqual(mint.publicKey)
      expect(minter.mint?.publicKey.toString()).toBe('tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg')
      expect(minter.mintDecimals).toBe(decimals)
      expect(minter.mintLen).toEqual(82)

      expect(minter.extensionTypes()).toMatchInlineSnapshot(`[]`)
      expect(generateCommands({ minter, url }).join(' ')).toMatchInlineSnapshot(
        `"spl-token -u http://localhost:8899 -p TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --fee-payer ./FEESzCoiEmPyHoAc9bDJaMiDS5K9Gxew1f84wphB8j7Z.json --decimals 6 ./tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg.json"`,
      )
    })

    it('should configure a token with basic config and fee payer and enable close authority, non-transferable and immutable owner', () => {
      // ARRANGE
      const decimals = 6
      const feePayer = fixtureFeePayerKeypair
      const mint = fixtureMintKeypair

      // ACT
      const minter = new Minter({
        decimals,
        feePayer,
        mint,
        closeAuthority: true,
        nonTransferable: true,
        metadata: {
          name: 'Test Token',
          symbol: 'TEST',
          image: `https://avatars.jakerunzer.com/TEST`,
        },
      })

      // ASSERT
      expect(minter.programId).toBe(TOKEN_2022_PROGRAM_ID)
      expect(minter.feePayer?.secretKey).toStrictEqual(feePayer.secretKey)
      expect(minter.feePayer?.publicKey).toStrictEqual(feePayer.publicKey)
      expect(minter.mint?.secretKey).toStrictEqual(mint.secretKey)
      expect(minter.mint?.publicKey).toStrictEqual(mint.publicKey)
      expect(minter.mint?.publicKey.toString()).toBe('tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg')
      expect(minter.mintDecimals).toBe(decimals)
      expect(minter.mintLen).toBe(274)
      expect(minter.metadata).toMatchInlineSnapshot(`
        {
          "additionalMetadata": [],
          "image": "https://avatars.jakerunzer.com/TEST",
          "mint": "tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg",
          "name": "Test Token",
          "symbol": "TEST",
          "updateAuthority": "FEESzCoiEmPyHoAc9bDJaMiDS5K9Gxew1f84wphB8j7Z",
          "uri": "https://metadata-tool.deno.dev/metadata?name=Test%20Token&symbol=TEST&mint=tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg&image=https%3A%2F%2Favatars.jakerunzer.com%2FTEST",
        }
      `)

      expect(minter.extensionTypes()).toMatchInlineSnapshot(`
        [
          "MintCloseAuthority",
          "MetadataPointer",
          "NonTransferable",
        ]
      `)
      expect(generateCommands({ minter, url }).join(' ')).toMatchInlineSnapshot(
        `"spl-token -u http://localhost:8899 -p TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --enable-close --enable-non-transferable --fee-payer ./FEESzCoiEmPyHoAc9bDJaMiDS5K9Gxew1f84wphB8j7Z.json --decimals 6 ./tEstL29Tz2kgkfnn8JGpukdnC3Zrsx5pHB1hVr2TqMg.json"`,
      )
    })
  })

  describe('createToken', () => {
    // Create Token Script

    it('should create a token with all config options configured', async () => {
      // ARRANGE
      const decimals = 6
      const feePayer = fixtureFeePayerKeypair
      const mint = Keypair.generate()

      // ACT
      const minter = new Minter({
        decimals,
        feePayer,
        mint,
        closeAuthority: true,
        nonTransferable: true,
        interest: { rate: 10000, rateAuthority: feePayer.publicKey },
        metadata: {
          name: 'Test Token',
          symbol: 'TEST',
          image: `https://avatars.jakerunzer.com/TEST`,
        },
        authority: feePayer.publicKey,
        freezeAuthority: feePayer.publicKey,
      })

      // ASSERT
      expect(minter.programId).toBe(TOKEN_2022_PROGRAM_ID)
      expect(minter.feePayer?.secretKey).toStrictEqual(feePayer.secretKey)
      expect(minter.feePayer?.publicKey).toStrictEqual(feePayer.publicKey)
      expect(minter.mint?.secretKey).toStrictEqual(mint.secretKey)
      expect(minter.mint?.publicKey).toStrictEqual(mint.publicKey)
      expect(minter.mintDecimals).toBe(decimals)
      expect(minter.mintLen).toBe(330)
      expect(minter.metadata?.updateAuthority).toStrictEqual(feePayer.publicKey)
      expect(minter.metadata?.name).toStrictEqual('Test Token')
      expect(minter.metadata?.symbol).toStrictEqual('TEST')

      const signature = await createToken({ connection, minter })
      expect(signature).toBeDefined()
      expect(minter.extensionTypes()).toMatchInlineSnapshot(`
        [
          "MintCloseAuthority",
          "InterestBearingConfig",
          "MetadataPointer",
          "NonTransferable",
        ]
      `)
      const mintInfo = await getMint(connection, mint.publicKey, 'confirmed', TOKEN_2022_PROGRAM_ID)

      expect(mintInfo?.decimals).toBe(decimals)
      expect(mintInfo?.address).toStrictEqual(mint.publicKey)
      expect(getExtensionTypes(mintInfo?.tlvData).map((extension) => ExtensionType[extension])).toMatchInlineSnapshot(`
        [
          "MintCloseAuthority",
          "NonTransferable",
          "InterestBearingConfig",
          "MetadataPointer",
          "TokenMetadata",
        ]
      `)
    })
  })
})

async function ensureBalance({
  connection,
  publicKey,
  amount,
}: {
  connection: Connection
  publicKey: PublicKey
  amount: number
}) {
  const balance = await connection.getBalance(publicKey)
  if (balance < LAMPORTS_PER_SOL) {
    const signature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL)
    await connection.confirmTransaction({ signature, ...(await connection.getLatestBlockhash()) })
  }
}
