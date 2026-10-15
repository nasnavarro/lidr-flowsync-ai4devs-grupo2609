const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

type VineError = { message: string; rule: string; field: string }

export class ApiError extends Error {
  status: number
  fields: Record<string, string>

  constructor(status: number, fields: Record<string, string>, message: string) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

type ApiRequestOptions = RequestInit & { token?: string }

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options

  const response = await fetch(`${API_URL}/api/v1${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  if (response.status === 204) {
    return undefined as T
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const fields: Record<string, string> = {}
    if (Array.isArray(body?.errors)) {
      for (const error of body.errors as VineError[]) {
        fields[error.field] = error.message
      }
    }
    throw new ApiError(response.status, fields, body?.message ?? 'No se pudo completar la operación.')
  }

  return body as T
}
