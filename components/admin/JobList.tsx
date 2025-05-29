"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Briefcase, Edit, Trash2, Plus } from 'lucide-react'

import { Job } from '@/lib/types'
import { getJobs, deleteJob } from '@/lib/store'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'

export default function JobList() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Get jobs from localStorage
    const jobList = getJobs()
    // Sort by posted date (newest first)
    jobList.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    setJobs(jobList)
  }, [])

  const handleDeleteJob = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete)
      setJobs(jobs.filter(job => job.id !== jobToDelete))
      setJobToDelete(null)
    }
  }

  const getJobTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Full-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Part-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Contract':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Job Listings</CardTitle>
            <CardDescription>
              Manage all job postings from here
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/jobs/new" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Job</span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-6">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">No jobs posted yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by creating a new job posting.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push('/admin/jobs/new')}
            >
              Create your first job posting
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      <div>
                        {job.title}
                        <div className="md:hidden mt-1 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{job.location}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getJobTypeBadgeColor(job.type)}`}>{job.type}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge 
                        variant="outline"
                        className={getJobTypeBadgeColor(job.type)}
                      >
                        {job.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(job.postedDate), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/jobs/${job.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setJobToDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the job posting for "{job.title}".
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setJobToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={handleDeleteJob}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}