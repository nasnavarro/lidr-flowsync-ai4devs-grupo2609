const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api/v1'

export type ValidationError = {
  field: string
  message: string
  rule: string
}

export class ApiError extends Error {
  status: number
  errors: ValidationError[]

  constructor(status: number, message: string, errors: ValidationError[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  fieldError(field: string) {
    return this.errors.find((error) => error.field === field)?.message
  }
}

export type User = {
  id: number
  fullName: string | null
  nif: string
  createdAt: string
  updatedAt: string
  initials: string
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const { method = 'GET', body, token } = options

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      payload?.errors?.[0]?.message ?? payload?.message ?? 'Something went wrong'
    throw new ApiError(response.status, message, payload?.errors ?? [])
  }

  return payload.data as T
}

export function signup(data: {
  fullName: string | null
  nif: string
  password: string
  passwordConfirmation: string
}) {
  return request<{ user: User; token: string }>('/auth/signup', { method: 'POST', body: data })
}

export function login(data: { nif: string; password: string }) {
  return request<{ user: User; token: string }>('/auth/login', { method: 'POST', body: data })
}

export function logout(token: string) {
  return request<{ message: string }>('/account/logout', { method: 'POST', token })
}

export function getProfile(token: string) {
  return request<User>('/account/profile', { token })
}

export function changePassword(
  token: string,
  data: { currentPassword: string; password: string; passwordConfirmation: string },
) {
  return request<{ message: string }>('/account/password', { method: 'PUT', body: data, token })
}
