import FeedbackForm from '@/components/FeedbackForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const FeedbackPage = () => {
  return (
    <>
    <div className='text-2xl '><h2>I'm glad you read my resume. Thank you for your feedback!</h2>
    <FeedbackForm />
    <div className='flex justify-center'>
    <Link href={"/portfolio"}>
    <Button >back to Resume v0.1</Button>
    </Link>

    </div>
    </div>
    </>
  )
}

export default FeedbackPage