import { SVGProps } from 'react'
import { useUiColorScheme } from '../ui-theme'
import { UiLogoTypePubKeyBlack } from './ui-logo-type-pubkey-black'
import { UiLogoTypePubKeyWhite } from './ui-logo-type-pubkey-white'

export interface UiLogoTypePubKeyProps extends SVGProps<SVGSVGElement> {
  height?: number
  width?: number
}
export function UiLogoTypePubKey(props: UiLogoTypePubKeyProps = {}) {
  const { colorScheme } = useUiColorScheme()

  return colorScheme === 'dark' ? <UiLogoTypePubKeyWhite {...props} /> : <UiLogoTypePubKeyBlack {...props} />
}
