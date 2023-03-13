export function splitDate(date: Date) {
  const day = date.getDate()
  const month: string = date.toLocaleDateString(undefined, { month: 'long' })
  const year = date.getFullYear()

  return { day, month, year }
}
