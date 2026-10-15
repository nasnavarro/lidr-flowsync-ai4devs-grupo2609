import { apiRequest } from './api'

export type AuthUser = {
  id: number
  fullName: string | null
  email: string
  initials: string
  createdAt: string
  updatedAt: string | null
}

export type AuthSession = {
  user: AuthUser
  token: string
}

export type SignupInput = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginInput = {
  email: string
  password: string
}

// El backend envuelve toda respuesta de `ctx.serialize(...)` en
// `{ data: ... }` (ver backend/providers/api_provider.ts, ApiSerializer).
// signup/login/profile pasan por serialize(); logout no (el controller
// devuelve un objeto plano), así que no lleva envoltorio.

export function signup(input: SignupInput): Promise<AuthSession> {
  return apiRequest<{ data: AuthSession }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((response) => response.data)
}

export function login(input: LoginInput): Promise<AuthSession> {
  return apiRequest<{ data: AuthSession }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((response) => response.data)
}

export function fetchProfile(token: string): Promise<AuthUser> {
  return apiRequest<{ data: AuthUser }>('/account/profile', { token }).then(
    (response) => response.data,
  )
}

export function logout(token: string): Promise<void> {
  return apiRequest<void>('/account/logout', { method: 'POST', token })
}
