import { Accordion, SimpleGrid } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { UiAlert, UiAnchor } from '@tokengator/ui'
import { UserUiCard } from './user-ui-card'
import { UserUiDetails } from './user-ui-details'
import { UserUiItem } from './user-ui-item'

export function UserUiGrid({ users }: { users: User[] }) {
  return users.length ? (
    <SimpleGrid cols={{ base: 0, lg: 3 }}>
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
      {users?.map((item) => (
        <UserUiCard key={item.id} user={item} to={`/users/${item.id}`}>
          <UserUiDetails user={item} />
          <UiAnchor ta="right" size="xs" to={`/users/${item.id}`}>
            Read more...
          </UiAnchor>
        </UserUiCard>
      ))}
    </SimpleGrid>
  ) : (
    <UiAlert title="No users found" message="This is unexpected 😬" />
  )
}
