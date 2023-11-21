export const monthNamesShortened: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export function formatDateToShortenedString (dateString: string): string {
  const date = new Date(dateString)
  return `${
    monthNamesShortened[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`
}
