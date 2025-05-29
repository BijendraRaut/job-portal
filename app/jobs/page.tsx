"use client"

import { useEffect, useState } from 'react'
import { getJobs, initializeStore } from '@/lib/store'
import { Job, JobType } from '@/lib/types'
import JobFilter from '@/components/public/JobFilter'
import JobCard from '@/components/public/JobCard'
import { Briefcase } from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [filters, setFilters] = useState<{
    type?: JobType,
    location?: string,
    search?: string
  }>({})
  const [locations, setLocations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeStore()
      
      // Get jobs from localStorage
      const jobList = getJobs()
      
      // Sort by posted date (newest first)
      jobList.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      
      // Extract unique locations for filter
      const uniqueLocations = Array.from(new Set(jobList.map(job => job.location)))
      
      setJobs(jobList)
      setFilteredJobs(jobList)
      setLocations(uniqueLocations)
      setIsLoading(false)
    }
  }, [])
  
  useEffect(() => {
    let result = jobs
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(job => job.type === filters.type)
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(job => job.location === filters.location)
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.description.toLowerCase().includes(searchTerm) ||
        (job.company && job.company.toLowerCase().includes(searchTerm))
      )
    }
    
    setFilteredJobs(result)
  }, [filters, jobs])
  
  const handleFilterChange = (newFilters: { type?: JobType, location?: string, search?: string }) => {
    setFilters(newFilters)
  }
  
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse">Loading jobs...</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Available Jobs</h1>
        <p className="text-muted-foreground mt-2">
          Discover and apply for jobs that match your skills and interests
        </p>
      </div>
      
      <JobFilter 
        locations={locations} 
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No jobs match your filters</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search criteria or browse all jobs
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}