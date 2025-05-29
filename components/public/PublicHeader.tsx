"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Briefcase, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isAuthenticated } from '@/lib/auth'

export default function PublicHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isAdmin = isAuthenticated()
  
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="flex items-center font-bold text-primary text-lg"
              >
                <Briefcase className="h-6 w-6 mr-2" />
                <span>JobBoard</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === '/' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname.startsWith('/jobs') 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Browse Jobs
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAdmin ? (
              <Button asChild variant="outline">
                <Link href="/admin" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/admin/login" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Admin Login
                </Link>
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith('/jobs') 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            {isAdmin ? (
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}