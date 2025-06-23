import './globals.css'

import LoadingSpiner from '@repo/ui/ds/LoadingSpiner'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { headers as nextHeaders } from 'next/headers'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode, Suspense } from 'react'
import { Toaster } from 'sonner'

import { getMenu } from '@/apis/internal'
import webConfig from '@/config/web.yaml'
import LayoutHandler from '@/handler/LayoutHandler'
import ReactQueryProviderHandler from '@/handler/ReactQueryProviderHandler'
import { WebConfigType } from '@/types/web'

import ThemeProvider from '../handler/ThemeProvider'


const { brand } = (webConfig as WebConfigType)

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: brand.name,
  description:  brand.desc,
  icons: { icon: '/favicon.ico' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const headers = await nextHeaders();
  let baseURL: string | undefined = '/';
  const protocol = headers.get('x-forwarded-proto') || 'http';
  const host = headers.get('host');
  if (host) baseURL = `${protocol}://${host}`;
  const menuData = await getMenu(baseURL);
  
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
