import { SampleUser as User, sampleUsers as users } from '@tokengator/sample-users'
import { createContext, ReactNode, useContext } from 'react'

export interface UserProviderContext {
  users: User[]
}

const Context = createContext<UserProviderContext>({} as UserProviderContext)

export function UserProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={{ users }}>{children}</Context.Provider>
}

export function useUser() {
  return useContext(Context)
}
