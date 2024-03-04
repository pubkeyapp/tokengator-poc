import { Card, Container, rem, SimpleGrid, Text, Title, useMantineTheme } from '@mantine/core'
import { IconCube, IconTerminal, IconUsers } from '@tabler/icons-react'
import { presets } from '@tokengator/presets'
import { UiAnchor } from '@tokengator/ui'
import classes from './home-ui-features.module.css'

const mockdata = [
  {
    color: 'indigo',
    title: 'Extensible Presets',
    to: '/presets',
    description: `Pick one of ${presets.length} presets or use it as a starting point for your own.`,
    icon: IconCube,
  },
  {
    color: 'violet',
    title: 'Sample Users',
    to: '/users',
    description: 'We have a few sample users to get you started without connecting to a wallet.',
    icon: IconUsers,
  },
  {
    color: 'grape',
    title: 'Customizable CLI',
    to: '/cli',
    description: 'Use the CLI to create tokens, close and mint tokens and extend it to your needs.',
    icon: IconTerminal,
  },
]

export function HomeUiFeatures() {
  const theme = useMantineTheme()
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={2} color={theme.colors[feature.color][6]} />
      <UiAnchor
        to={feature.to}
        fz="lg"
        fw={500}
        className={classes.cardTitle}
        mt="md"
        c={theme.colors[feature.color][6]}
      >
        {feature.title}
      </UiAnchor>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))

  return (
    <Container size="lg" py="xl">
      <Title ff={'"Baloo Bhai 2"'} order={2} className={classes.title} ta="center" mt="sm">
        Create Tokens with ease
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Create and distribute tokens on Solana with ease using TokenGator.
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  )
}
