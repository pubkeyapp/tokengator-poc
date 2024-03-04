import { SampleUser as User } from '@tokengator/sample-users'
import { UiCard, UiStack } from '@tokengator/ui'
import { ReactNode } from 'react'
import { UserUiItem } from './user-ui-item'

export function UserUiCard({ children, user, to }: { children?: ReactNode; user: User; to?: string }) {
  return (
    <UiCard title={<UserUiItem user={user} to={to} />}>
      <UiStack>{children}</UiStack>
    </UiCard>
  )
}
