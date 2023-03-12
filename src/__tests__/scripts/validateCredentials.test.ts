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
})
