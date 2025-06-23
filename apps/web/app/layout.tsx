import './globals.css'

import LoadingSpiner from '@repo/ui/ds/LoadingSpiner'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode, Suspense } from 'react'
import { Toaster } from 'sonner'

import { getMenu } from '@/apis/internal'
import LayoutHandler from '@/handler/LayoutHandler'
import ReactQueryProviderHandler from '@/handler/ReactQueryProviderHandler'

import ThemeProvider from './ThemeProvider'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'IDLT APPs',
  description: 'IDLT APPs',
  icons: { icon: '/img_32_favicon.ico' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const menuData = await getMenu()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ReactQueryProviderHandler>
            <NuqsAdapter>
              <Suspense fallback={<LoadingSpiner />}>
                <Toaster richColors />
                <LayoutHandler menuData={menuData}>{children}</LayoutHandler>
              </Suspense>
            </NuqsAdapter>
          </ReactQueryProviderHandler>
        </ThemeProvider>
      </body>
    </html>
  )
}
