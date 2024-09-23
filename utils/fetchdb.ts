import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// import {createClient} from '@/utils/supabase/server'


// export async function getResumeData() {
//     const supabase = createClient()
    
//     const {data, error} = await supabase
//         .from('resume')
//         .select('*')
//         .single()
//     return data
// }