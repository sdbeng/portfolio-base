import { parseISO, format, isValid } from 'date-fns'

interface DateDisplayProps {
  dateString: string | null | undefined
}

export function DateDisplay({ dateString }: DateDisplayProps) {
    // console.log('DateDisplay received:===', dateString)
    // console.log('DateDisplay received type:', typeof dateString)
    if(!dateString) {
        console.log('DateDisplay: No date provided.')
        return <span>No date provided</span>}

  const date = parseISO(dateString)
  if(!isValid(date)) {
    console.log('DateDisplay: Invalid date')
    return <span>Invalid date</span>
    }

    const formattedDate = format(date, 'MMMM d, yyyy')
//   console.log('DateDisplay: Formatted date', formattedDate)
  
  return <time dateTime={dateString}>{formattedDate}</time>
}