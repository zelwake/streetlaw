import { randomHash } from '@/scripts/hash/randomHash'
import { expect, it } from '@jest/globals'

describe('Testing randomHash generator', () => {
  it('should have length of 40 characters', () => {
    for (let i = 0; i < 100; i++) expect(randomHash()).toHaveLength(40)
  })

  it('should not be shorter than 40 characters', () => {
    for (let i = 0; i < 100; i++)
      expect(randomHash().length).not.toBeLessThan(40)
  })

  it('should not be longer than 40 characters', () => {
    for (let i = 0; i < 100; i++)
      expect(randomHash().length).not.toBeGreaterThan(40)
  })
})
