const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' })

/** "2025-10" -> "Oct 2025" */
export function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-').map(Number)
  return monthFormat.format(new Date(Date.UTC(year, month - 1)))
}

/** "Oct 2025 – Present" */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}
