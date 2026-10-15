import { useCallback, useEffect, useState } from 'react'
import {
  fetchProfile,
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
  type AuthUser,
  type LoginInput,
  type SignupInput,
} from '../../lib/auth'

const STORAGE_KEY = 'flowsync.auth.token'

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY))
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    fetchProfile(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY)
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = useCallback(async (input: LoginInput) => {
    const session = await apiLogin(input)
    localStorage.setItem(STORAGE_KEY, session.token)
    setToken(session.token)
    setUser(session.user)
  }, [])

  const signup = useCallback(async (input: SignupInput) => {
    const session = await apiSignup(input)
    localStorage.setItem(STORAGE_KEY, session.token)
    setToken(session.token)
    setUser(session.user)
  }, [])

  const logout = useCallback(async () => {
    if (token) {
      await apiLogout(token).catch(() => {})
    }
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setUser(null)
  }, [token])

  return { user, loading, login, signup, logout }
}
