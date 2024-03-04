import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiContainer, UiHeader, UiHeaderLink, UiLayout } from '@tokengator/ui'

import { ReactNode } from 'react'
import { ClusterChecker, ClusterUiSelect } from './cluster/ui'
import { KeypairChecker, KeypairUiBalance, KeypairUiSelect } from './keypair/ui'

export function AppLayout({
  children,
  icons,
  links,
}: {
  children: ReactNode
  icons: { href: string; icon: ReactNode }[]
  links: UiHeaderLink[]
}) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={links}
          profile={
            <Group>
              <KeypairUiBalance />
              <KeypairUiSelect />
              <ClusterUiSelect />
              {icons.map(({ href, icon }) => (
                <ActionIcon key={href} variant="light" size="lg" component="a" href={href} target="_blank">
                  {icon}
                </ActionIcon>
              ))}
            </Group>
          }
        />
      }
    >
      <UiContainer>
        <ClusterChecker>
          <KeypairChecker />
        </ClusterChecker>
        {children}
      </UiContainer>
    </UiLayout>
  )
}
