import { Text } from '@mantine/core'
import { sampleUsers as users } from '@tokengator/sample-users'
import { UiCard, UiCardTitle, UiGroup, UiStack } from '@tokengator/ui'
import { UserUiGrid } from '../../ui'

export function UserListFeature() {
  return (
    <UiStack>
      <UiCard
        title={
          <UiGroup>
            <UiCardTitle>Users</UiCardTitle>
          </UiGroup>
        }
      >
        <UiStack>
          <Text>There are {users.length} example users that are used in the demo.</Text>
        </UiStack>
      </UiCard>
      <UserUiGrid users={users} />
    </UiStack>
  )
}
