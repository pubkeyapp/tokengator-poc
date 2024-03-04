import { Button, Group, Select } from '@mantine/core'
import { Keypair } from '@solana/web3.js'
import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { toastError, UiStack } from '@tokengator/ui'
import { useState } from 'react'
import { uiToastLink } from '../../../../../account/data-access'
import { useCluster } from '../../../../../cluster/data-access'
import { useKeypair } from '../../../../../keypair/data-access'
import { useMintBusinessVisa } from '../../../../data-access'

export function PresetUiAppBusinessVisaMint() {
  const { getExplorerUrl } = useCluster()
  const { keypair } = useKeypair()
  const mutation = useMintBusinessVisa({ feePayer: keypair.solana as Keypair })
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
          loading={mutation.isPending}
          disabled={!user}
          onClick={() => {
            const address = user?.keypair.publicKey
            if (!address) {
              return
            }

            mutation
              .mutateAsync(address)
              .then(({ createTokenTx, mintTx }) => {
                uiToastLink({
                  link: getExplorerUrl(`tx/${createTokenTx}`),
                  label: 'View Create Token Transaction',
                })
                uiToastLink({
                  link: getExplorerUrl(`tx/${mintTx}`),
                  label: 'View Mint Transaction',
                })
              })
              .catch((err) => {
                toastError(`Failed to mint business visa: ${err.message}`)
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
