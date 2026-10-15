import vine from '@vinejs/vine'
import { password } from '#validators/user'

/**
 * Validator to use when a user changes their own password.
 */
export const changePasswordValidator = vine.create({
  currentPassword: vine.string(),
  password: password(),
  passwordConfirmation: vine.string().sameAs('password'),
})
