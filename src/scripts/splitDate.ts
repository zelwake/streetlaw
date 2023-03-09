export function splitDate(date: Date) {
  const months = new Map<number, string>([
    [1, 'leden'],
    [2, 'únor'],
    [3, 'březen'],
    [4, 'duben'],
    [5, 'květen'],
    [6, 'červen'],
    [7, 'červenec'],
    [8, 'srpen'],
    [9, 'září'],
    [10, 'říjen'],
    [11, 'listopad'],
    [12, 'prosinec'],
  ])
  const day = date.getDay()
  const month: string = months.get(date.getMonth()) as string
  const year = date.getFullYear()
  return { day, month, year }
}
