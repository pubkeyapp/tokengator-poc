import { List } from '@mantine/core'
import { PresetRole } from '@tokengator/presets'

export function PresetUiRoles({ roles }: { roles: PresetRole[] }) {
  return roles.length ? (
    <List listStyleType="disc" spacing="xs" withPadding>
      {roles.map((role) => (
        <List.Item key={role.id}>
          Role: <strong>{role.name}</strong>
          {role.details?.length && (
            <List size="sm" mt="sm">
              {role.details.map((detail) => (
                <List.Item c="dimmed" key={detail}>
                  {detail}
                </List.Item>
              ))}
            </List>
          )}
        </List.Item>
      ))}
    </List>
  ) : null
}
