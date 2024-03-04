import { Button, Group, Select } from '@mantine/core'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { toastError, toastSuccess, toastWarning, UiStack } from '@tokengator/ui'
import { useState } from 'react'
import { useVerifyPreOrder } from '../../../../data-access'

export function PresetUiAppPreOrderVerify() {
  const mutation = useVerifyPreOrder()
  const [user, setUser] = useState<User | undefined>()

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
            const address = user?.keypair.publicKey
            if (!address) {
              return
            }

            mutation
              .mutateAsync(address)
              .then((res) => {
                if (res.valid) {
                  toastSuccess(`Verified: ${user.name} has ${res.amount} tokens`)
                } else {
                  toastWarning(`User ${user.name} has no pre-order tokens`)
                }
              })
              .catch((err) => {
                toastError(`Failed to verify pre-order token: ${err.message}`)
                console.log(err)
              })
          }}
        >
          Verify
        </Button>
      </Group>
    </UiStack>
  )
}
