import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ApiError } from '../lib/api'
import './AuthForm.css'

const PASSWORD_HINT =
  'Mínimo 8 caracteres, con una mayúscula, una minúscula, un número y un carácter especial.'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [nif, setNif] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [apiError, setApiError] = useState<ApiError | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setApiError(null)
    setIsSubmitting(true)
    try {
      await register({ fullName: fullName || null, nif, password, passwordConfirmation })
      navigate('/', { replace: true })
    } catch (err) {
      if (err instanceof ApiError) setApiError(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <h1>Crear cuenta</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="fullName">Nombre completo</label>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="nif">NIF</label>
          <input
            id="nif"
            name="nif"
            autoComplete="username"
            value={nif}
            onChange={(event) => setNif(event.target.value)}
            required
          />
          {apiError?.fieldError('nif') && (
            <span className="auth-field-error">{apiError.fieldError('nif')}</span>
          )}
        </div>
        <div className="auth-field">
          <label htmlFor="password">Contraseña</label>
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
          <label htmlFor="passwordConfirmation">Repite la contraseña</label>
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
        {apiError && !apiError.errors.length && <p className="auth-error">{apiError.message}</p>}
        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>
      <p className="auth-switch">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}
