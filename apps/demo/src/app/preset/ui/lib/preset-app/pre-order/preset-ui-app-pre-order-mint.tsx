import { Button, Group, Select } from '@mantine/core'
import { Keypair } from '@solana/web3.js'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { toastError, toastSuccess, UiInfo, UiStack } from '@tokengator/ui'
import { useState } from 'react'
import { useKeypair } from '../../../../../keypair/data-access'
import { useMintPreOrder, usePresetPreOrder } from '../../../../data-access'

export function PresetUiAppPreOrderMint() {
  const { mint } = usePresetPreOrder()
  const { keypair } = useKeypair()
  const mutation = useMintPreOrder({ feePayer: keypair.solana as Keypair })
  const [user, setUser] = useState<User | undefined>()

  const { refresh } = usePresetPreOrder()
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
          disabled={!user}
          loading={mutation.isPending}
          onClick={() => {
            const destination = user?.keypair.publicKey
            if (!destination) {
              return
            }

            const amount = window.prompt('Enter amount', '1')
            if (!amount) {
              return
            }
            mutation
              .mutateAsync({ destination, amount: parseFloat(amount) })
              .then((res) => {
                refresh()
                toastSuccess(`Minted pre-order token: ${res}`)
              })
              .catch((err) => {
                toastError(`Failed to mint pre-order token: ${err.message}`)
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
