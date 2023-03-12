import { registerType } from '@projectType/authTypes'

export function validateCredentials(body: registerType): {
  error: string
  success: boolean
} {
  return {
    error: 'Missing parameters',
    success: false,
  }
}
