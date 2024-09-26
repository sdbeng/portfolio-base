import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
    return data
}

export async function getEventsJson() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
    return JSON.stringify(data)
}

export async function getEventById(id) {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
    return data
}

export async function createEvent(event) {
    const { data, error } = await supabase
        .from('events')
        .insert([event])
    return data
}

export async function createEventJson() {
    const { data, error } = await supabase.from('events').insert([
        {
            // id: 1,
            title: "8am mass",
            starttime: new Date("September 27, 2024 08:00:00"),
            endtime: new Date("September 27, 2024 08:30:00"),
            volunteer_name: "John Foo Doe",
          },
          {
            // id: 2,
            title: "10am school mass",
            start: new Date("September 27, 2024 10:00:00"),
            end: new Date("September 27, 2024 11:00:00"),
            volunteer_name: "Dan D. Smith",
          },
          {
            // id: 3,
            title: "14pm special mass",
            start: new Date("September 28, 2024 14:00:00"),
            end: new Date("September 28, 2024 15:59:00"),
            volunteer_name: "George D. Washington",
          },
        // {
        //   title: 'The Poky Little Puppy',
        //   author: 'Janette Sebring Lowrey',
        //   metadata: {
        //     description: 'Puppy is slower than other, bigger animals.',
        //     price: 5.95,
        //     ages: [3, 6],
        //   },
        // },
        
      ])
    return JSON.stringify(data)
}      

export async function updateEvent(id, event) {
    const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
    return data
}

export async function deleteEvent(id) {
    const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
    return data
}

export async function getFeedback() {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
    return data
}

export async function createFeedback(feedback) {
    const { data, error } = await supabase
        .from('feedback')
        .insert([feedback])
    return data
}

export async function deleteFeedback(id) {
    const { data, error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id)
    return data
}

