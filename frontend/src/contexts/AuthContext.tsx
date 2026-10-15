import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import * as api from '../lib/api'

const TOKEN_STORAGE_KEY = 'flowsync.token'

type AuthContextValue = {
  user: api.User | null
  token: string | null
  isLoading: boolean
  login: (data: { nif: string; password: string }) => Promise<void>
  register: (data: {
    fullName: string | null
    nif: string
    password: string
    passwordConfirmation: string
  }) => Promise<void>
  logout: () => Promise<void>
  changePassword: (data: {
    currentPassword: string
    password: string
    passwordConfirmation: string
  }) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  )
  const [user, setUser] = useState<api.User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    api
      .getProfile(token)
      .then(setUser)
      .catch(() => {
        // Token invalid or invalidated by a login elsewhere: sign out locally.
        setToken(null)
        setUser(null)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
      })
      .finally(() => setIsLoading(false))
  }, [token])

  function persistSession(session: { user: api.User; token: string }) {
    localStorage.setItem(TOKEN_STORAGE_KEY, session.token)
    setToken(session.token)
    setUser(session.user)
  }

  async function login(data: { nif: string; password: string }) {
    const session = await api.login(data)
    persistSession(session)
  }

  async function register(data: {
    fullName: string | null
    nif: string
    password: string
    passwordConfirmation: string
  }) {
    const session = await api.signup(data)
    persistSession(session)
  }

  async function logout() {
    if (token) {
      await api.logout(token).catch(() => {})
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setUser(null)
  }

  async function changePassword(data: {
    currentPassword: string
    password: string
    passwordConfirmation: string
  }) {
    if (!token) throw new Error('Not authenticated')
    await api.changePassword(token, data)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
