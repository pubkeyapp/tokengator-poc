import { Avatar, Group, Stack } from '@mantine/core'
import { SampleUser as User } from '@tokengator/sample-users'
import { getColorByIndex, getRandomInt, UiAnchor } from '@tokengator/ui'

export function UserUiItem({ user, to }: { user: User; to?: string }) {
  const letter = user.name[0].toUpperCase()
  const color = getColorByIndex(getRandomInt(user.id))

  return (
    <Group gap="xs" wrap="nowrap" align="center">
      <Avatar size="md" color={color}>
        {letter}
      </Avatar>
      <Stack gap={0}>
        <UiAnchor size="xl" to={to}>
          {user.name}
        </UiAnchor>
      </Stack>
    </Group>
  )
}
