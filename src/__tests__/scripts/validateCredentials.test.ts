import { validateCredentials } from '@/scripts/validateCredentials'
import { expect, test } from '@jest/globals'
import { registerType } from '@projectType/authTypes'

describe('Check for credentials validity', () => {
  test('On missing information, return false and error', () => {
    const body: registerType = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Missing parameters',
      success: false,
    })
  })
})
