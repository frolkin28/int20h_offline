import { useState, useEffect } from 'react'

export const ACCESS_TOKEN_KEY = 'access_token'

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)
  const [isSignedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    setToken(token)
    setSignedIn(!!token)
  }, [])

  const login = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    setSignedIn(true)
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    setToken(null)
    setSignedIn(false)
  }

  return { token, isSignedIn, login, logout }
}
