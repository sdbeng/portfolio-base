import { createClient} from '@/utils/supabase/client';
// THIS IS a v1 - there is an improved version v2 done - I WONT be using this fetch func!!!
export default async function fetchEventsDB() {
  const supabase = createClient();
  const { data, error } = await supabase.from('eventsdb').select('*');
    if (error) {
        console.log('error', error);
        return error;
    }
    // console.log('fetchEventsDB data===', JSON.stringify(data));
    //iterate over the data and set the calendar_id to calendarId as the calendar signature expects it
    return data.map(event => ({
        ...event,
        calendarId: event.calendar_id,
        start: new Date(event.start).toISOString(),//ensure 'start' is a date object
    })).sort((a, b) => a.start - b.start);
    
    // return data;
}

/* 
READ this:
Explanation:
Sorting on the Server: The order clause in the Supabase query sorts the events by the start property in ascending order before sending the data to the client.
Sorting on the Client: The start property is converted to a Date object to ensure correct sorting, and the events are then sorted by the start property in ascending order.
Both approaches are valid, but sorting on the server can be more efficient for large datasets. Choose the approach that best fits your application's needs.
*/