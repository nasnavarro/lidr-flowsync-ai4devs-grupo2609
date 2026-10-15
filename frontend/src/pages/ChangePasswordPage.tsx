import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ApiError } from '../lib/api'
import './AuthForm.css'

const PASSWORD_HINT =
  'Mínimo 8 caracteres, con una mayúscula, una minúscula, un número y un carácter especial.'

export function ChangePasswordPage() {
  const { changePassword } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [apiError, setApiError] = useState<ApiError | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setApiError(null)
    setSuccess(false)
    setIsSubmitting(true)
    try {
      await changePassword({ currentPassword, password, passwordConfirmation })
      setSuccess(true)
      setCurrentPassword('')
      setPassword('')
      setPasswordConfirmation('')
    } catch (err) {
      if (err instanceof ApiError) setApiError(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <h1>Cambiar contraseña</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="currentPassword">Contraseña actual</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
          {apiError?.fieldError('currentPassword') && (
            <span className="auth-field-error">
              {apiError.fieldError('currentPassword')}
            </span>
          )}
        </div>
        <div className="auth-field">
          <label htmlFor="password">Nueva contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <span className="auth-field-error">
            {apiError?.fieldError('password') ?? PASSWORD_HINT}
          </span>
        </div>
        <div className="auth-field">
          <label htmlFor="passwordConfirmation">Repite la nueva contraseña</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
          {apiError?.fieldError('passwordConfirmation') && (
            <span className="auth-field-error">
              {apiError.fieldError('passwordConfirmation')}
            </span>
          )}
        </div>
        {success && <p className="auth-success">Contraseña actualizada.</p>}
        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/">Volver</Link>
      </p>
    </section>
  )
}
