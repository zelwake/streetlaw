import { registerType } from '@projectType/authTypes'

export function validateCredentials(body: registerType): {
  error: string
  success: boolean
} {
  let error = ''
  let success = false

  const { username, password, email, firstName, lastName } = trimValues(body)

  error = checkForMissingParameters(
    username,
    password,
    email,
    firstName,
    lastName
  )
  if (error.length > 0) return { error, success }

  error = checkUsernameLength(username)
  if (error.length > 0) return { error, success }

  error = validatePassword(password)
  if (error.length > 0) return { error, success }

  success = true
  return {
    error,
    success,
  }
}

function trimValues(body: registerType): registerType {
  return {
    username: body.username.trim(),
    password: body.password.trim(),
    email: body.email.trim(),
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
  }
}

function checkUsernameLength(username: string): string {
  if (username.length < 6) return 'Uživatelské jméno je kratší než 6 znaků'
  return ''
}

function checkForMissingParameters(
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
) {
  if (!username || !password || !email || !firstName || !lastName)
    return 'Nejsou vyplněny všechny údaje'
  return ''
}

function validatePassword(password: string): string {
  if (password.length < 8) return 'Heslo je kratší než 8 znaků'
  if (!/\d/.test(password)) return 'Heslo neobsahuje číslo'
  if (!/[a-z]/.test(password)) return 'Heslo neobsahuje malé písmeno'
  if (!/[A-Z]/.test(password)) return 'Heslo neobsahuje velké písmeno'
  return ''
}
