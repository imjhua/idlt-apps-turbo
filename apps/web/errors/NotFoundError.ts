import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from '@repo/request/httpStatusCodes'

import { AppError, DetailType } from './AppError'

export class NotFoundError extends AppError {
  constructor(message = HTTP_STATUS_MESSAGES[HTTP_STATUS.NOT_FOUND], details?: DetailType) {
    super(message, HTTP_STATUS.NOT_FOUND, details)
  }
}
