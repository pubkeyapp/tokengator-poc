import { SimpleGrid } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { UiAlert, UiCard } from '@tokengator/ui'
import { UserUiDetails } from './user-ui-details'
import { UserUiItem } from './user-ui-item'

export function UserUiGrid({ users }: { users: User[] }) {
  return users.length ? (
    <SimpleGrid cols={{ base: 0, md: 2 }}>
      {users?.map((user) => (
        <UiCard key={user.id} title={<UserUiItem user={user} to={`/users/${user.id}`} />}>
          <UserUiDetails user={user} />
        </UiCard>
      ))}
    </SimpleGrid>
  ) : (
    <UiAlert title="No users found" message="This is unexpected 😬" />
  )
}
