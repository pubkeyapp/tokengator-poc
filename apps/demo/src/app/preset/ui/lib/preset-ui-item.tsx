import { Avatar, Group, Stack, Text } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiAnchor } from '@tokengator/ui'
import { ReactNode } from 'react'

export function PresetUiItem({
  children,
  description,
  preset,
  to,
}: {
  children?: ReactNode
  description?: string
  preset: Preset
  to?: string
}) {
  return (
    <Group gap="xs" wrap="nowrap" align="start" justify="space-between">
      <Avatar size="lg" src={preset.image} />
      <Stack gap={0} style={{ flexGrow: 1 }}>
        <UiAnchor size="xl" to={to}>
          {preset.name}
        </UiAnchor>
        <Text c="dimmed" size="sm">
          {description ?? preset.description}
        </Text>
        {children}
      </Stack>
    </Group>
  )
}
