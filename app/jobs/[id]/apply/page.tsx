"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Job } from '@/lib/types'
import { getJob, initializeStore } from '@/lib/store'
import ApplicationForm from '@/components/public/ApplicationForm'
import { Button } from '@/components/ui/button'

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    // Initialize localStorage store on client side
    if (typeof window !== 'undefined') {
      initializeStore()
      
      // Get job data
      const jobData = getJob(params.id)
      if (jobData) {
        setJob(jobData)
      } else {
        // Job not found, redirect to jobs page
        router.push('/jobs')
      }
      
      setLoading(false)
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container py-10 max-w-3xl">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse">Loading job data...</div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto py-10 max-w-3xl">
        <div className="h-[400px] flex items-center justify-center">
          <div>Job not found.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-5 py-10 max-w-3xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          asChild
        >
          <Link href={`/jobs/${job.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
        <p className="text-muted-foreground mt-2">
          Complete the form below to apply for this position at {job.company}.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <ApplicationForm jobId={job.id} jobTitle={job.title} />
      </div>
    </div>
  )
}