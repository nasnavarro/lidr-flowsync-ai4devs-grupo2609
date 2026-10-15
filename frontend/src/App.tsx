import { useState } from 'react'
import './App.css'
import { useAuth } from './features/auth/useAuth'
import { LoginForm } from './features/auth/LoginForm'
import { RegisterForm } from './features/auth/RegisterForm'
import { Dashboard } from './features/auth/Dashboard'

function App() {
  const { user, loading, login, signup, logout } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')

  if (loading) {
    return (
      <main id="auth-root">
        <p>Cargando…</p>
      </main>
    )
  }

  return (
    <main id="auth-root">
      {user ? (
        <Dashboard user={user} onLogout={logout} />
      ) : mode === 'login' ? (
        <LoginForm onSubmit={login} onSwitchToRegister={() => setMode('register')} />
      ) : (
        <RegisterForm onSubmit={signup} onSwitchToLogin={() => setMode('login')} />
      )}
    </main>
  )
}

export default App
