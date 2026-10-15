import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AuthForm.css'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <section className="auth-page">
      <h1>Hola, {user?.fullName ?? user?.nif}</h1>
      <p>NIF: {user?.nif}</p>
      <div className="auth-switch">
        <Link to="/account/password">Cambiar contraseña</Link>
      </div>
      <button className="auth-submit" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </section>
  )
}
