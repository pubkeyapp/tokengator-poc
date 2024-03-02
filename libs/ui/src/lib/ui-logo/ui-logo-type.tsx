import { useUiColorScheme } from '../ui-theme'
import { SVGProps } from 'react'
import { UiLogoTypeBlack } from './ui-logo-type-black'
import { UiLogoTypeWhite } from './ui-logo-type-white'

export interface UiLogoTypeProps extends SVGProps<SVGSVGElement> {
  height?: number
  width?: number
}
export function UiLogoType(props: UiLogoTypeProps = {}) {
  const { colorScheme } = useUiColorScheme()

  return colorScheme === 'dark' ? <UiLogoTypeWhite {...props} /> : <UiLogoTypeBlack {...props} />
}
