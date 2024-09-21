import {createClient} from '@/utils/supabase/server'


export async function getResumeData() {
    const supabase = createClient()
    
    const {data, error} = await supabase
        .from('resume')
        .select('*')
        .single()
    return data
}