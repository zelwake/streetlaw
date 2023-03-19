import { validateCredentials } from '@/scripts/validateCredentials'
import { expect, test } from '@jest/globals'
import { RegisterType } from '@projectType/authTypes'

describe('Check for credentials validity', () => {
  test('On missing or empty parameters, return false and error', () => {
    const body: RegisterType = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Nejsou vyplněny všechny údaje',
      success: false,
    })
  })

  test('Password being too short, return false and error', () => {
    const body: RegisterType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'test',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo je kratší než 8 znaků',
      success: false,
    })
  })

  test('Password not having number, return false and error', () => {
    const body: RegisterType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'testtest',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje číslo',
      success: false,
    })
  })

  test('Password not having lowercase character, return false and error', () => {
    const body: RegisterType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'TEST1234',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje malé písmeno',
      success: false,
    })
  })

  test('Password not having uppercase character, return false and error', () => {
    const body: RegisterType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'test1234',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje velké písmeno',
      success: false,
    })
  })

  test('On valid input, return true and no error', () => {
    const body: RegisterType = {
      email: 'email@domena.cc',
      firstName: 'E',
      lastName: 'Mail',
      password: 'Heslo123',
    }

    expect(validateCredentials(body)).toEqual({
      error: null,
      success: true,
    })
  })
})
