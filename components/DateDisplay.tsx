import { parseISO, format, isValid } from 'date-fns'

interface DateDisplayProps {
  dateString: string | null | undefined
}

export function DateDisplay({ dateString }: DateDisplayProps) {
    console.log('dateString===', dateString)
    if(!dateString) return <span>No date provided</span>

  const date = parseISO(dateString)
  if(!isValid(date)) return <span>Invalid date</span>
  
  return <time dateTime={dateString}>{format(date, 'MMMM d, yyyy')}</time>
}