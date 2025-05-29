import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import PublicHeader from '@/components/public/PublicHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobBoard - Find Your Next Opportunity',
  description: 'Browse and apply for jobs on our job board',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link
          rel="icon"
          href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-briefcase h-6 w-6 mr-2'><path d='M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path><rect width='20' height='14' x='2' y='6' rx='2'></rect></svg>"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PublicHeader />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}