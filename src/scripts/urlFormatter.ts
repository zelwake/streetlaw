export function urlFormatter(str: string): string {
  // Replace all spaces with hyphens
  const text = str.replaceAll(' ', '-')

  // Create a date object with the current date and time
  const date = new Date()

  // Get the year, month, and day of the current date
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Add 1 to get 1-indexed month
  const day = date.getDate()

  // Get the hour, minute and second of the current time
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // Format the date and time values with leading zeros
  const formattedMonth = month.toString().padStart(2, '0')
  const formattedDay = day.toString().padStart(2, '0')
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinute = minute.toString().padStart(2, '0')
  const formattedSecond = second.toString().padStart(2, '0')

  // Concatenate the formatted values with the original text
  const formattedString = `${text}-${year}${formattedMonth}${formattedDay}${formattedHour}${formattedMinute}${formattedSecond}`

  return formattedString
}
