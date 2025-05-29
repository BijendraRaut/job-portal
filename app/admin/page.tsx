"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase, Users } from 'lucide-react'

import { isAuthenticated } from '@/lib/auth'
import { getJobs, getApplications } from '@/lib/store'
import JobList from '@/components/admin/JobList'

export default function AdminDashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  // These would typically be fetched from an API
  const jobCount = typeof window !== 'undefined' ? getJobs().length : 0
  const applicationCount = typeof window !== 'undefined' ? getApplications().length : 0

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300">
              <Briefcase className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs</p>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{jobCount}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Applications</p>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{applicationCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      <JobList />
    </div>
  )
}