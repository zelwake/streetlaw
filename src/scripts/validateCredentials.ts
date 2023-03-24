import { RegisterType } from '@projectType/authTypes'

export function validateCredentials(body: RegisterType): {
  error: string | null
  success: boolean
} {
  const { password, email, firstName, lastName } = trimValues(body)

  const error = validateUser(password, email, firstName, lastName)

  return { error, success: error === null }
}

function trimValues(body: RegisterType): RegisterType {
  return {
    password: body.password.trim(),
    email: body.email.trim(),
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
  }
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Heslo je kratší než 8 znaků'
  if (!/\d/.test(password)) return 'Heslo neobsahuje číslo'
  if (!/[a-z]/.test(password)) return 'Heslo neobsahuje malé písmeno'
  if (!/[A-Z]/.test(password)) return 'Heslo neobsahuje velké písmeno'
  return null
}

function validateUser(
  password: string,
  email: string,
  firstName: string,
  lastName: string
): string | null {
  const missingParams = !password || !email || !firstName || !lastName
  if (missingParams) {
    return 'Nejsou vyplněny všechny údaje'
  }

  const invalidPassword = validatePassword(password)
  return invalidPassword
}
