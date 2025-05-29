"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import { initializeStore } from "@/lib/store"
import { ThemeProvider } from "@/components/shared/ThemeProvider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    // Initialize store with mock data on client side
    if (typeof window !== "undefined") {
      initializeStore()
    }
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!isLoginPage && <AdminHeader />}
      <main>{children}</main>
    </ThemeProvider>
  )
}