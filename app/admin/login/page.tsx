"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import LoginForm from '@/components/admin/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to admin dashboard if already authenticated
    if (isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Job Board Admin
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Log in to manage your job postings
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}