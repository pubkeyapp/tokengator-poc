import { businessVisas } from './keypairs'

export function getBusinessVisaMintList(): string[] {
  return Object.keys(businessVisas) as string[]
}
