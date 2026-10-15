// El ticket (FLOW-1) pide una política de contraseña más estricta que la
// que valida hoy el backend (solo longitud 8-32, ver
// backend/app/validators/user.ts). Se aplica aquí, en el cliente, como
// ayuda de UX — no sustituye una validación real en el servidor.

export type PasswordCheck = {
  label: string
  passed: boolean
}

const SPECIAL_CHARS = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/

export function checkPasswordPolicy(password: string): PasswordCheck[] {
  return [
    { label: 'Al menos 8 caracteres', passed: password.length >= 8 },
    { label: 'Una letra mayúscula', passed: /[A-Z]/.test(password) },
    { label: 'Una letra minúscula', passed: /[a-z]/.test(password) },
    { label: 'Un número', passed: /[0-9]/.test(password) },
    { label: 'Un carácter especial', passed: SPECIAL_CHARS.test(password) },
  ]
}
