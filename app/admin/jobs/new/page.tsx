"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { isAuthenticated } from '@/lib/auth'
import JobForm from '@/components/admin/JobForm'
import { Button } from '@/components/ui/button'

export default function NewJobPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Initialize localStorage store on client side
    if (typeof window !== 'undefined') {
      const { initializeStore } = require('@/lib/store')
      initializeStore()
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

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
        <h1 className="text-3xl font-bold">Create New Job</h1>
        <p className="text-muted-foreground mt-1">
          Fill out the form below to create a new job posting.
        </p>
      </div>
      
      <JobForm />
    </div>
  )
}