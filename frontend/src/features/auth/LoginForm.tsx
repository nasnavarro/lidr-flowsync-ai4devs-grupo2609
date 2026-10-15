import { useState, type FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import type { LoginInput } from '../../lib/auth'

type LoginFormProps = {
  onSubmit: (input: LoginInput) => Promise<void>
  onSwitchToRegister: () => void
}

export function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({ email, password })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="login-password">Contraseña</label>
      <input
        id="login-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error ? <p className="auth-error">{error}</p> : null}

      <button type="submit" className="auth-submit" disabled={submitting}>
        {submitting ? 'Entrando…' : 'Entrar'}
      </button>

      <p className="auth-switch">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Regístrate
        </button>
      </p>
    </form>
  )
}
