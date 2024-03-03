import { Minter } from './minter'

export function generateCommands({ minter, url }: { minter: Minter; url: string }): string[] {
  const commands = [`spl-token -u ${url} -p ${minter.programId} create-token`]

  if (minter.closeAuthority) {
    commands.push(`--enable-close`)
  }

  if (minter.nonTransferable) {
    commands.push(`--enable-non-transferable`)
  }

  if (minter.feePayer) {
    commands.push(`--fee-payer ./${minter.feePayer.publicKey}.json`)
  }

  if (minter.mintDecimals) {
    commands.push(`--decimals ${minter.mintDecimals}`)
  }

  if (minter.mint) {
    commands.push(`./${minter.mint.publicKey}.json`)
  }

  return commands
}
