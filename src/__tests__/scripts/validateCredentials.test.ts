import { validateCredentials } from '@/scripts/validateCredentials'
import { expect, test } from '@jest/globals'
import { registerType } from '@projectType/authTypes'

describe('Check for credentials validity', () => {
  test('On missing or empty parameters, return false and error', () => {
    const body: registerType = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: '',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Nejsou vyplněny všechny údaje',
      success: false,
    })
  })

  test('Username being too short, return false and error', () => {
    const body: registerType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'test',
      username: 'Lojza',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Uživatelské jméno je kratší než 6 znaků',
      success: false,
    })
  })

  test('Password being too short, return false and error', () => {
    const body: registerType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'test',
      username: 'username',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo je kratší než 8 znaků',
      success: false,
    })
  })

  test('Password not having number, return false and error', () => {
    const body: registerType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'testtest',
      username: 'username',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje číslo',
      success: false,
    })
  })

  test('Password not having lowercase character, return false and error', () => {
    const body: registerType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'TEST1234',
      username: 'username',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje malé písmeno',
      success: false,
    })
  })

  test('Password not having uppercase character, return false and error', () => {
    const body: registerType = {
      email: 'test',
      firstName: 'test',
      lastName: 'test',
      password: 'test1234',
      username: 'username',
    }

    expect(validateCredentials(body)).toEqual({
      error: 'Heslo neobsahuje velké písmeno',
      success: false,
    })
  })

  test('On valid input, return true and no error', () => {
    const body: registerType = {
      email: 'email@domena.cc',
      firstName: 'E',
      lastName: 'Mail',
      password: 'Heslo123',
      username: 'username',
    }

    expect(validateCredentials(body)).toEqual({
      error: '',
      success: true,
    })
  })
})
