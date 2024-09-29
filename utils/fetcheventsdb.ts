import { createClient} from '@/utils/supabase/client';

export default async function fetchEventsDB() {
  const supabase = createClient();
  const { data, error } = await supabase.from('eventsdb').select('*');
    if (error) {
        console.log('error', error);
        return error;
    }

    return data;
}