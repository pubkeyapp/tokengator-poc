import { Accordion } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { UiAlert, UiAnchor } from '@tokengator/ui'
import { UserUiDetails } from './user-ui-details'
import { UserUiItem } from './user-ui-item'

export function UserUiGrid({ users }: { users: User[] }) {
  return users.length ? (
    <Accordion multiple variant="separated">
      {users?.map((user) => (
        <Accordion.Item key={user.id} value={user.id}>
          <Accordion.Control>
            <UserUiItem user={user} />
          </Accordion.Control>
          <Accordion.Panel>
            <UserUiDetails user={user} />
            <UiAnchor ta="right" size="xs" to={`/users/${user.id}`}>
              Read more...
            </UiAnchor>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ) : (
    <UiAlert title="No users found" message="This is unexpected 😬" />
  )
}
