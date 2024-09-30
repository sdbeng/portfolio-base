import { createClient} from '@/utils/supabase/client';

export default async function fetchEventsDB() {
  const supabase = createClient();
  const { data, error } = await supabase.from('eventsdb').select('*');
    if (error) {
        console.log('error', error);
        return error;
    }
    //iterate over the data and set the calendar_id to calendarId as the calendar signature expects it
    return data.map(event => ({
        ...event,
        calendarId: event.calendar_id,
    }))
    
    // return data;
}