import { Group, Text, Title } from '@mantine/core'
import { UiLogoType, UiLogoTypePubKey, UiStack, UiWarning } from '@tokengator/ui'
import { HomeUiFeatures } from '../../ui'

export function IntroductionFeature() {
  return (
    <UiStack>
      <UiStack align="center" py="xl">
        <UiLogoType height={100} />
        <Title fw={400} c="dimmed" order={2} mt="xl">
          Easy Token Gates using Solana Token Extensions.
        </Title>

        <Group justify="center" align="center" gap={6}>
          <UiLogoType height={24} />
          <Title fw={400} pt={3} order={4} display={'flex'}>
            is brought to you by
          </Title>
          <UiLogoTypePubKey height={24} />
        </Group>
        <UiWarning
          mt="xl"
          variant="outline"
          title="Disclaimer"
          message={
            <UiStack gap="xs">
              <Text>This is a demo targeting developers and not end users.</Text>
              <Text>
                All the keypairs used in this demo are <strong>public</strong> and stored in the browser.
              </Text>
              <Text fw="bold" c="yellow">
                Do not use this code in production without customizing it.
              </Text>
            </UiStack>
          }
        />
      </UiStack>
      <HomeUiFeatures />
    </UiStack>
  )
}
