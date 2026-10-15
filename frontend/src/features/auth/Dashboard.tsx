import type { AuthUser } from '../../lib/auth'

type DashboardProps = {
  user: AuthUser
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <section className="dashboard">
      <div className="avatar" aria-hidden="true">
        {user.initials}
      </div>
      <h1>Hola, {user.fullName ?? user.email}</h1>
      <p>{user.email}</p>
      <button type="button" className="auth-submit" onClick={onLogout}>
        Cerrar sesión
      </button>
    </section>
  )
}
