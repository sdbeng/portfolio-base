import { getResumeData } from "@/utils/fetchdb"

export default async function PortfolioHome() {
    
    const resumeData = await getResumeData()

    if(!resumeData) {
        return <div>No resume data found.</div>
    }

    console.log('resumeData===', resumeData)

    return(
        <>
            <h1>Portfolio Data</h1>
        </>
    )
}

