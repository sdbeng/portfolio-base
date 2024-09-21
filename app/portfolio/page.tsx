import {createClient} from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function PortfolioHome() {
    // console.log('LOG supabase instance===', supabase)
    try {
        const {data, error, status} = await supabase
            .from('resume')
            .select(`name, title, summary`)
            

        if(error && status !== 406) {
            console.error(error)
            throw error
        }
        
        if(!data) {
            return <div>No resume data found.</div>
        }
        console.log('status===', status)
        console.log('data===', data)
        return <div>{JSON.stringify(data)}</div>;
    } catch (error) {
        console.error('Error fetching resume data', error)
        
    }



    return(
        <>
            <h1>Portfolio Data</h1>
        </>
    )
}

