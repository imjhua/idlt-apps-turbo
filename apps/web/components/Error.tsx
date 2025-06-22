import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from '@repo/request/httpStatusCodes'
import { ReactNode } from 'react'

type ErrorProps = {
  title?: string
  stausCode?: number
  errorMessage: string
  redirectElement?: ReactNode
}

function Error({ title, stausCode, errorMessage, redirectElement }: ErrorProps) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-title1 font-bold py-4">
        {title || HTTP_STATUS_MESSAGES[(stausCode || 500) as keyof typeof HTTP_STATUS_MESSAGES]}
      </div>
      <div className="text-body1 text-center whitespace-pre-wrap">{errorMessage}</div>
      {redirectElement && <div className="mt-12">{redirectElement}</div>}
    </div>
  )
}

export default Error
