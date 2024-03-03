import { createContext } from 'react'
import { User } from './types'

interface AuthContext {
  isSignedIn: boolean
  login: (token: string) => void
  logout: () => void
  token: string | null
  user: User | null
  isStorageChecked: boolean
}

export const AuthContext = createContext<AuthContext>({
  isSignedIn: false,
  login: () => {},
  logout: () => {},
  token: null,
  user: null,
  isStorageChecked: false,
})
