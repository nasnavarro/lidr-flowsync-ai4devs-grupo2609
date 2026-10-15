import { useMemo, useState, type FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import type { SignupInput } from '../../lib/auth'
import { checkPasswordPolicy } from '../../lib/passwordPolicy'

type RegisterFormProps = {
  onSubmit: (input: SignupInput) => Promise<void>
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const passwordChecks = useMemo(() => checkPasswordPolicy(password), [password])
  const policyPassed = passwordChecks.every((check) => check.passed)
  const passwordsMatch = password.length > 0 && password === passwordConfirmation

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!policyPassed) {
      setError('La contraseña no cumple los requisitos de seguridad.')
      return
    }
    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        fullName: fullName.trim() ? fullName.trim() : null,
        email,
        password,
        passwordConfirmation,
      })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear la cuenta.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Crear cuenta</h1>

      <label htmlFor="register-name">Nombre completo (opcional)</label>
      <input
        id="register-name"
        type="text"
        autoComplete="name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />

      <label htmlFor="register-email">Email</label>
      <input
        id="register-email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <p className="auth-hint">El acceso es por email: el backend todavía no tiene un campo de NIF.</p>

      <label htmlFor="register-password">Contraseña</label>
      <input
        id="register-password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <ul className="password-policy">
        {passwordChecks.map((check) => (
          <li key={check.label} data-passed={check.passed}>
            {check.label}
          </li>
        ))}
      </ul>

      <label htmlFor="register-password-confirmation">Repite la contraseña</label>
      <input
        id="register-password-confirmation"
        type="password"
        autoComplete="new-password"
        required
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
      />

      {error ? <p className="auth-error">{error}</p> : null}

      <button type="submit" className="auth-submit" disabled={submitting}>
        {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>

      <p className="auth-switch">
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Inicia sesión
        </button>
      </p>
    </form>
  )
}
