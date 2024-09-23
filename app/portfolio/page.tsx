import {getResume} from '@/app/api/query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function PortfolioHome() {    
    const resume = await getResume()
    
    if(!resume) {
        return <div className="flex justify-center items-center h-screen">No resume info found.</div>
    }        
    console.log('resume===', resume)
    // return <div>{JSON.stringify(resume)}</div>;  

    return(
        <>
            <main className='min-h-screen p-8 ${GeistSans.className} bg-gradient-to-br from-blue-50 to-indigo-100'>                   
                <div className='max-w-4xl mx-auto space-y-8'>
                    <header className='text-center'>
                    <h1 className='text-4xl font-bold text-indigo-900'>{resume.name }</h1>
                    <p className='text-lg text-indigo-700'>{resume.title}</p>
                    </header>
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{resume.summary}</p>
                        </CardContent>
                    </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                        </div>
                    </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {resume.jobs?.map((job: any) => (
                <li key={job.id}>
                  <h3 className="text-lg font-semibold">{job.position} at {job.company}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(job.startDate).toLocaleDateString()} - 
                    {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <p className="mt-2">{job.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* edu */}
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {resume.education?.map((edu: any) => (
                <li key={edu.id}>
                  <h3 className="text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(edu.startDate).toLocaleDateString()} - 
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        </div>
        </main>
        </>
    )
}

