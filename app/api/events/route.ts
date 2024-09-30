import {createClient} from '@/utils/supabase/server'
import {NextResponse} from 'next/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const {data, error} = await supabase
  .from('eventsdb')
    .select('*')
    .order('start', {ascending: true})

    if (error) {
        console.error('Error fetching eventsdb', error)
        return NextResponse.json({error: 'Failed to fetch eventsdb'}, {status: 500})
    }
    
    const formattedEvents = data.map(event => {
        const startDate = new Date(event.start)
        const endDate = new Date(event.end)
    
        return {
          id: event.id,
          created_at: event.created_at,
          title: event.title,
          start: `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')} ${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`,
          end: `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')} ${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`,
          people: event.people,
          calendarId: event.calendar_id
        }
    })
    // console.log('********START******************')
    // console.log('FformattedEvents===', formattedEvents)
    // console.log('**********END****************')
    return NextResponse.json(formattedEvents)
}