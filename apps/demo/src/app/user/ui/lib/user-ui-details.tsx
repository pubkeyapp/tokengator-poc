import { Code, List } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { UiStack } from '@tokengator/ui'

export function UserUiDetails({ user }: { user: User }) {
  return (
    <UiStack>
      {user.keypairs?.length && (
        <List listStyleType="none" spacing="sm">
          {user.keypairs.map(({ publicKey }) => (
            <List.Item key={publicKey.toString()}>
              <Code>{publicKey.toString()}</Code>
            </List.Item>
          ))}
        </List>
      )}
    </UiStack>
  )
}
