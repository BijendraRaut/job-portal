"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { isAuthenticated } from '@/lib/auth'
import { getJob } from '@/lib/store'
import { Job } from '@/lib/types'
import JobForm from '@/components/admin/JobForm'
import { Button } from '@/components/ui/button'

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    // Initialize localStorage store on client side
    if (typeof window !== 'undefined') {
      const { initializeStore } = require('@/lib/store')
      initializeStore()
  
      // Redirect to login if not authenticated
      if (!isAuthenticated()) {
        router.push('/admin/login')
        return
      }
      
      // Get job data
      const jobData = getJob(params.id)
      if (jobData) {
        setJob(jobData)
      } else {
        // Job not found, redirect to admin dashboard
        router.push('/admin')
      }
      
      setLoading(false)
    }
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container py-10 max-w-5xl">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse">Loading job data...</div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container py-10 max-w-5xl">
        <div className="h-[400px] flex items-center justify-center">
          <div>Job not found.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-5 py-10 max-w-5xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <p className="text-muted-foreground mt-1">
          Update the details for "{job.title}"
        </p>
      </div>
      
      <JobForm job={job} />
    </div>
  )
}