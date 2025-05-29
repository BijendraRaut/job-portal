"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { MapPin, Calendar, Briefcase, ArrowLeft } from 'lucide-react'

import { Job } from '@/lib/types'
import { getJob, initializeStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function JobDetailPage({ params }: { params: { id: string } }) {
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
      <div className="container py-10 max-w-4xl">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse">Loading job details...</div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container py-10 max-w-4xl">
        <div className="h-[400px] flex items-center justify-center">
          <div>Job not found.</div>
        </div>
      </div>
    )
  }

  const getJobTypeBadgeVariant = (type: string) => {
    switch(type) {
      case 'Full-time':
        return 'default';
      case 'Part-time':
        return 'secondary';
      case 'Contract':
        return 'outline';
      default:
        return 'default';
    }
  }

  return (
    <div className="container mx-auto px-5 py-10 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          asChild
        >
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-xl text-muted-foreground mt-1">{job.company}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge 
                variant={getJobTypeBadgeVariant(job.type)}
                className="text-sm font-medium"
              >
                {job.type}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Posted {format(new Date(job.postedDate), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Briefcase className="h-5 w-5 mr-2" />
              <span>{job.type}</span>
            </div>
          </div>
          
          <div className="border-t border-border pt-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose dark:prose-invert max-w-none">
              {/* Format description with paragraphs */}
              {job.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Interested in this role?</h3>
              <p className="text-muted-foreground">
                Submit your application now to join {job.company}
              </p>
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href={`/jobs/${job.id}/apply`}>
                Apply Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}