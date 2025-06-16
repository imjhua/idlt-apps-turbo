import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from '@repo/request/httpStatusCodes';

import { AppError, DetailType } from './AppError';

export class ValidationError extends AppError {
  constructor(message = HTTP_STATUS_MESSAGES[HTTP_STATUS.BAD_REQUEST], details?: DetailType) {
    super(message, HTTP_STATUS.BAD_REQUEST, details);
  }
}
