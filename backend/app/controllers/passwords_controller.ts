import hash from '@adonisjs/core/services/hash'
import { changePasswordValidator } from '#validators/password'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class PasswordsController {
  async update({ request, auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { currentPassword, password } = await request.validateUsing(changePasswordValidator)

    const currentPasswordIsValid = await hash.use().verify(user.password, currentPassword)
    if (!currentPasswordIsValid) {
      throw new errors.E_VALIDATION_ERROR([
        {
          field: 'currentPassword',
          message: 'The current password is incorrect',
          rule: 'currentPassword',
        },
      ])
    }

    user.password = password
    await user.save()

    return response.ok({
      message: 'Password updated successfully',
    })
  }
}
