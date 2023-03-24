import { comparePasswordHash, hashedPassword } from '@/scripts/hash/bcrypt'
import { expect, it } from '@jest/globals'

describe('Testing hashing of passwords', () => {
  it('should return true for same password', async () => {
    const password = 'password'
    const hashed = await hashedPassword(password)

    expect(await comparePasswordHash(password, hashed)).toBe(true)
  })

  it('should return false for different password', async () => {
    let password = 'password'
    const hashed = await hashedPassword(password)
    password = 'password2'

    expect(await comparePasswordHash(password, hashed)).toBe(false)
  })
})
