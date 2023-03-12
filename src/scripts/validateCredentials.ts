import { RegisterType } from '@projectType/authTypes'

export function validateCredentials(body: RegisterType): {
  error: string | null
  success: boolean
} {
  const { username, password, email, firstName, lastName } = trimValues(body)

  const error = validateUser(username, password, email, firstName, lastName)

  return { error, success: error === null }
}

function trimValues(body: RegisterType): RegisterType {
  return {
    username: body.username.trim(),
    password: body.password.trim(),
    email: body.email.trim(),
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
  }
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Heslo je kratší než 8 znaků'
  if (!/\d/.test(password)) return 'Heslo neobsahuje číslo'
  if (!/[a-z]/.test(password)) return 'Heslo neobsahuje malé písmeno'
  if (!/[A-Z]/.test(password)) return 'Heslo neobsahuje velké písmeno'
  return null
}

function validateUser(
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
): string | null {
  const missingParams =
    !username || !password || !email || !firstName || !lastName
  if (missingParams) {
    return 'Nejsou vyplněny všechny údaje'
  }

  const invalidUsername = username.length < 6
  if (invalidUsername) {
    return 'Uživatelské jméno je kratší než 6 znaků'
  }

  const invalidPassword = validatePassword(password)
  return invalidPassword
}
