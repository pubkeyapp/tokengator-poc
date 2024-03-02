import { ActionIcon, Text, TextInput, TextInputProps } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PublicKey } from '@solana/web3.js'
import { IconCurrencySolana, IconSearch } from '@tabler/icons-react'

export function SolanaUiAddressInput({
  address,
  setAddress,
  ...props
}: TextInputProps & {
  address: string
  setAddress: (address: string) => void
}) {
  const form = useForm({
    initialValues: { address },
    validate: {
      address: validateSolanaPublicKey,
    },
  })

  return (
    <form onSubmit={form.onSubmit(({ address }) => setAddress(address))}>
      <TextInput
        withAsterisk={props.required}
        label="Address"
        placeholder="Enter Solana address (base58)"
        leftSection={
          <Text c="dimmed" display="flex">
            <IconCurrencySolana />
          </Text>
        }
        rightSection={
          <ActionIcon disabled={!form.isDirty()} type="submit" color="brand" mr={0}>
            <IconSearch size={16} />
          </ActionIcon>
        }
        onKeyDown={(e) => {
          if (form.isValid()) {
            console.log('Valid address')
            setAddress(form.values.address)
          } else {
            console.log('Invalid address')
          }
        }}
        {...props}
        {...form.getInputProps('address')}
      />
    </form>
  )
}

function validateSolanaPublicKey(value: string) {
  if (!value) return
  try {
    new PublicKey(value)
  } catch (e) {
    return 'Invalid public key'
  }
}
