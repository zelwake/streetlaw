import { registerType } from '@projectType/authTypes'

export function validateCredentials(body: registerType): {
  error: string
  success: boolean
} {
  let error = ''
  const success = false

  const { username, password, email, firstName, lastName } = trimValues(body)

  error = checkForMissingParameters(
    username,
    password,
    email,
    firstName,
    lastName,
    error
  )

  if (error.length > 0) return { error, success }

  error = checkUsernameLength(username, error)

  return {
    error,
    success,
  }
}

function checkUsernameLength(username: string, error: string): string {
  if (username.length < 6) {
    error = 'Uživatelské jméno je kratší než 6 znaků'
  }
  return error
}

function checkForMissingParameters(
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  error: string
) {
  if (!username || !password || !email || !firstName || !lastName)
    error = 'Nejsou vyplněny všechny údaje'
  return error
}

function trimValues(body: registerType): {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
} {
  return {
    username: body.username.trim(),
    password: body.password.trim(),
    email: body.email.trim(),
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
  }
}
