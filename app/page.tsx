"use client"

import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowRight, Briefcase, Building, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { initializeStore } from '@/lib/store'

export default function Home() {
  useEffect(() => {
    // Initialize localStorage with mock data
    if (typeof window !== 'undefined') {
      initializeStore()
    }
  }, [])
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-primary/10"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Find Your Perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Job Match</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              Connect with top companies and discover opportunities aligned with your skills and career aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/jobs" className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/admin/login" className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  For Employers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use Our Job Board?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect talented individuals with outstanding organizations for meaningful career opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Opportunities</h3>
              <p className="text-muted-foreground mb-4">
                Discover job opportunities that match your skills, interests, and career goals.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Applications</h3>
              <p className="text-muted-foreground mb-4">
                Simple application process that helps you submit your candidacy in minutes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Employers</h3>
              <p className="text-muted-foreground mb-4">
                Get noticed by top companies looking for talent like you.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Job?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Browse our job listings and find the perfect opportunity for your skills and experience.
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/jobs" className="flex items-center">
              Browse Jobs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}