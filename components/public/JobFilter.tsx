"use client"

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

import { JobType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface JobFilterProps {
  locations: string[]
  onFilterChange: (filters: { type?: JobType | undefined, location?: string | undefined, search?: string | undefined }) => void
  initialFilters?: { type?: JobType | undefined, location?: string | undefined, search?: string | undefined }
}

export default function JobFilter({ locations, onFilterChange, initialFilters = {} }: JobFilterProps) {
  const [filters, setFilters] = useState({
    type: initialFilters.type || undefined,
    location: initialFilters.location || undefined,
    search: initialFilters.search || '',
  })
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const handleFilterChange = (key: string, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value === '' ? undefined : value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = { type: undefined, location: undefined, search: '' }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
    setIsMobileFilterOpen(false)
  }

  const handleApplyFilters = () => {
    onFilterChange(filters)
    setIsMobileFilterOpen(false)
  }

  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract']

  // Desktop filters
  const DesktopFilters = () => (
    <div className="hidden md:flex space-x-4 items-center">
      <div className="w-full max-w-xs">
        <Input
          placeholder="Search by job title..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="bg-background"
        />
      </div>
      
      <Select
        value={filters.type}
        onValueChange={(value) => handleFilterChange('type', value as JobType)}
      >
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {jobTypes.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={filters.location}
        onValueChange={(value) => handleFilterChange('location', value)}
      >
        <SelectTrigger className="w-[200px] bg-background">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>{location}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {(filters.type || filters.location || filters.search) && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleClearFilters}
          title="Clear filters"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
  
  // Mobile filters
  const MobileFilters = () => (
    <div className="md:hidden">
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Jobs</SheetTitle>
            <SheetDescription>
              Narrow down results by type, location, or keywords.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile-search">Search</Label>
              <Input
                id="mobile-search"
                placeholder="Search by job title..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-type">Job Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters({...filters, type: value as JobType | undefined})}
              >
                <SelectTrigger id="mobile-type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobile-location">Location</Label>
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters({...filters, location: value})}
              >
                <SelectTrigger id="mobile-location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter className="flex flex-row gap-2 sm:space-x-0">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Find Your Next Job</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search on mobile */}
          <div className="w-full md:hidden">
            <Input
              placeholder="Search by job title..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="bg-background"
            />
          </div>
          
          <DesktopFilters />
          <MobileFilters />
        </div>
      </CardContent>
    </Card>
  )
}