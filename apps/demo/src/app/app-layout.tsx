import { ActionIcon, Flex, Group, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiContainer, UiHeader, UiHeaderLink, UiLayout, UiLogoTypePubKey } from '@tokengator/ui'

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
      footer={
        <Flex h="100%" justify="space-between" align="center" px="md">
          <Tooltip label="This is a 🅿️ PubKey Project! ">
            <Group>
              <UiLogoTypePubKey height={28} />
            </Group>
          </Tooltip>
          <Group>
            {icons.map(({ href, icon }) => (
              <ActionIcon key={href} variant="light" size="lg" component="a" href={href} target="_blank">
                {icon}
              </ActionIcon>
            ))}
          </Group>
        </Flex>
      }
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
