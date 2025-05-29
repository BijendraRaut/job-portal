import Link from 'next/link'
import { format } from 'date-fns'
import { MapPin, Clock, Calendar, ArrowRight } from 'lucide-react'

import { Job } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
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
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-2">
            {job.title}
          </CardTitle>
          <Badge variant={getJobTypeBadgeVariant(job.type)}>
            {job.type}
          </Badge>
        </div>
        <p className="text-muted-foreground font-medium">{job.company}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {job.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Posted {format(new Date(job.postedDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/jobs/${job.id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}