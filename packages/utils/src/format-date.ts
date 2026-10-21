const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

export function formatDate(date: string) {
  return DATE_FORMAT.format(new Date(date))
}