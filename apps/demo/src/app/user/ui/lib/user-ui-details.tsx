import { Code, List } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { UiStack } from '@tokengator/ui'

export function UserUiDetails({ user }: { user: User }) {
  return (
    <UiStack>
      {user.keypair && (
        <List listStyleType="none" spacing="sm">
          <List.Item key={user.keypair.publicKey.toString()}>
            <Code>{user.keypair.publicKey.toString()}</Code>
          </List.Item>
        </List>
      )}
    </UiStack>
  )
}
