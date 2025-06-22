'use client'

import { HTTP_STATUS } from '@repo/request/httpStatusCodes'
import { Button } from '@repo/ui/button'
import Link from 'next/link'

import Error from '@/components/Error'
import { isAppError } from '@/errors'
import { isAxiosError } from '@/lib/request'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  let stausCode = 500
  let errorMessage = error.message || '서비스 제공 중 문제가 발생했습니다. 홈으로 이동해 주세요.'
  let user = {
    email: '',
    role: '',
    partnerName: '',
  }

  if (isAxiosError(error) && error.response) {
    const { message } = error.response.data
    errorMessage = message
    stausCode = error.response.status

    if (isAppError(error.response.data)) {
      const {
        details: { email, partnerName, role },
      } = error.response.data
      user = {
        email,
        role,
        partnerName,
      }
    }
  }

  return (
    <html>
      <body className="overflow-y-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2 px-3">
            <div className="ml-auto px-3">유저 프로필 영역</div>
          </div>
        </header>
        <div className="flex justify-center items-center flex-col h-[calc(100vh-64px)]">
          <Error
            stausCode={stausCode}
            errorMessage={errorMessage}
            redirectElement={
              <Button variant="outline" className="py-4" asChild>
                <Link href="/">홈으로 이동</Link>
              </Button>
            }
          />
        </div>
      </body>
    </html>
  )
}
