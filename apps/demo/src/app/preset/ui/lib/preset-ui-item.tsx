import { Avatar, Group, Stack, Text } from '@mantine/core'
import { Preset } from '@tokengator/presets'
import { UiAnchor } from '@tokengator/ui'

export function PresetUiItem({ preset, to }: { preset: Preset; to?: string }) {
  return (
    <Group gap="xs" wrap="nowrap" align="start">
      <Avatar size="lg" src={preset.image} />
      <Stack gap={0}>
        <UiAnchor size="xl" to={to}>
          {preset.name}
        </UiAnchor>
        <Text c="dimmed" size="sm">
          {preset.description}
        </Text>
      </Stack>
    </Group>
  )
}
