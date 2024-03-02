import { useUiColorScheme } from '../ui-theme'
import { SVGProps } from 'react'
import { UiLogoMarkBlack } from './ui-logo-mark-black'
import { UiLogoMarkWhite } from './ui-logo-mark-white'

export interface UiLogoMarkProps extends SVGProps<SVGSVGElement> {
  height?: number
  width?: number
}
export function UiLogoMark(props: UiLogoMarkProps = {}) {
  const { colorScheme } = useUiColorScheme()

  return colorScheme === 'dark' ? <UiLogoMarkWhite {...props} /> : <UiLogoMarkBlack {...props} />
}
