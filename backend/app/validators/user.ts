import vine from '@vinejs/vine'

/**
 * NIF/NIE: 8 digits + control letter, or X/Y/Z + 7 digits + control letter.
 */
const NIF_REGEX = /^[0-9XYZ][0-9]{7}[A-Z]$/i

/**
 * At least one uppercase, one lowercase, one digit and one special character.
 */
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

/**
 * Shared rules for nif and password.
 */
const nif = () => vine.string().trim().toUpperCase().regex(NIF_REGEX)
export const password = () =>
  vine.string().minLength(8).maxLength(32).regex(PASSWORD_COMPLEXITY_REGEX)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  nif: nif().unique({ table: 'users', column: 'nif' }),
  password: password(),
  passwordConfirmation: vine.string().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  nif: nif(),
  password: vine.string(),
})
