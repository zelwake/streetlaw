import { isExpired, setExpirationDate } from '@/scripts/timeDate/expirationTime'
import { expect, it } from '@jest/globals'

describe('Testing setExpirationDate function', () => {
  it('should create new time that is two hours in future', () => {
    const futureTime = new Date()
    futureTime.setHours(futureTime.getHours() + 2)

    expect(setExpirationDate().getTime()).toBeCloseTo(futureTime.getTime(), 4)
  })

  it('should not equal since times are not same', () => {
    const nowTime = new Date()

    expect(setExpirationDate()).not.toStrictEqual(nowTime)
  })
})

describe('Testing isExpired function', () => {
  it('should return false when two hours has not yet passed', () => {
    const time = new Date()
    time.setMinutes(time.getMinutes() + 10)

    expect(isExpired(time)).toBe(false)
  })

  it('should return true since two hours has already passed', () => {
    const time = new Date()
    time.setMinutes(time.getMinutes() - 10)

    expect(isExpired(time)).toBe(true)
  })
})
