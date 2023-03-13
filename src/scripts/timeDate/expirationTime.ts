export const setExpirationDate = (): Date => {
  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 2)
  return expirationDate
}

export const isExpired = (date: Date): boolean => {
  const now = new Date()
  return now > date
}
