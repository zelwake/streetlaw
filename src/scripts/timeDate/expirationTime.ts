export const setExpirationDate = (): Date => {
  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 2)
  return expirationDate
}

export const isExpired = (date: Date): boolean => {
  const now = new Date()
  const twoHours = 2 * 60 * 60 * 1000 // Two hours in milliseconds
  return now.getTime() - date.getTime() > twoHours
}
