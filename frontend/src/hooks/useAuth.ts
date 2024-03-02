import { useState, useEffect } from 'react'
import axios from 'axios'
import { User } from '../types'

export const ACCESS_TOKEN_KEY = 'access_token'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isSignedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    setToken(token)
    setSignedIn(!!token)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (isSignedIn) {
        await getUser()
      }
    })()
  }, [isSignedIn])

  const login = async (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    setSignedIn(true)
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    setToken(null)
    setUser(null)
    setSignedIn(false)
  }

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUser(response.data.data)
    } catch (error) {
      setUser(null)
      alert('Сталася помилка')
    }
  }

  return { user, token, isSignedIn, login, logout }
}
