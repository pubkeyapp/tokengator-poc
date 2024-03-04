import { Title } from '@mantine/core'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'

import { UiDebug, UiError, UiStack } from '@tokengator/ui'
import { useParams } from 'react-router-dom'
import { KeypairDetailScreen } from '../../../keypair/feature/lib/keypair-detail-feature'
import { UserUiCard } from '../../ui'

export function UserDetailWrapper() {
  const { id } = useParams() as { id: string }

  const user = users.find((user) => user.id === id)

  if (!user) {
    return <UiError message={`User not found: ${id}`} />
  }

  return <UserDetailScreen user={user} />
}

export function UserDetailScreen({ user }: { user: User }) {
  return (
    <UiStack>
      <UiStack gap={0}>
        <UserUiCard user={user}>
          <Title order={3}>Details</Title>

          <UiStack>
            {user.keypairs?.length && (
              <UiStack>
                {user.keypairs.map((keypair) => (
                  <KeypairDetailScreen key={keypair.publicKey.toString()} keypair={keypair} />
                ))}
              </UiStack>
            )}
          </UiStack>
        </UserUiCard>
      </UiStack>
      <UiDebug data={user} />
    </UiStack>
  )
}
