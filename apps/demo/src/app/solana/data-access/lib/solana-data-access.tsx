import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useSolanaQueries({ address }: { address: PublicKey | string }) {
  const { connection } = useConnection()
  const publicKey = useMemo(() => new PublicKey(address), [address])

  return {
    getAccountInfo: {
      queryKey: ['getAccountInfo', { endpoint: connection?.rpcEndpoint, publicKey }],
      queryFn: () => connection.getParsedAccountInfo(publicKey),
    },
    getBalance: {
      queryKey: ['getBalance', { endpoint: connection?.rpcEndpoint, publicKey }],
      queryFn: () => connection.getBalance(publicKey),
    },
  }
}

export function useSolanaGetAccountInfo({ address }: { address: PublicKey | string }) {
  return useQuery(useSolanaQueries({ address }).getAccountInfo)
}

export function useSolanaGetBalance({ address }: { address: PublicKey | string }) {
  return useQuery(useSolanaQueries({ address }).getBalance)
}

export function useSolanaGetRentExemptionBalance({ size }: { size: number }) {
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['getRentExemptionBalance', { endpoint: connection?.rpcEndpoint, size }],
    queryFn: () => connection.getMinimumBalanceForRentExemption(size),
  })
}
