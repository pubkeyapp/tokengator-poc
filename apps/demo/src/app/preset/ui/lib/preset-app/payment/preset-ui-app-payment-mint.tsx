import { Button, Group, Select } from '@mantine/core'
import { Keypair } from '@solana/web3.js'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { toastError, toastSuccess, UiInfo, UiStack } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../../../keypair/data-access'
import { useMintPayment, usePresetPayment } from '../../../../data-access'

export function PresetUiAppPaymentMint() {
  const { mint, refresh } = usePresetPayment()
  const { keypair } = useKeypair()
  const mutation = useMintPayment({ feePayer: keypair.solana as Keypair })
  const [user, setUser] = useState<User | undefined>()

  if (mint.mintAuthority?.toString() !== keypair.publicKey) {
    return <UiInfo message={`You are not the mint authority for this token`} />
  }
  return (
    <UiStack>
      <Select
        data={users.map((user) => ({ value: user.id, label: user.name }))}
        label="User"
        placeholder="Select user"
        value={user?.id}
        onChange={(value) => setUser(value ? users.find((u) => u.id === value) : undefined)}
      />
      <Group justify="flex-end">
        <Button
          loading={mutation.isPending}
          disabled={!user}
          onClick={() => {
            const destination = user?.keypair.publicKey
            if (!destination) {
              return
            }
            const amount = window.prompt('Enter amount', '100')
            if (!amount) {
              return
            }

            mutation
              .mutateAsync({ destination, amount: parseFloat(amount) })
              .then((res) => {
                refresh()
                toastSuccess(`Minted payment token: ${res}`)
              })
              .catch((err) => {
                toastError(`Failed to mint payment token: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Mint
        </Button>
      </Group>
    </UiStack>
  )
}
