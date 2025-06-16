/* eslint-disable @typescript-eslint/no-explicit-any */
export type DetailType = { email: string; role: string; partnerName: string };
export class AppError extends Error {
  public statusCode: number;
  public details?: DetailType;

  constructor(message: string, statusCode: number = 500, details?: DetailType) {
    super(message);
    console.log(this);

    this.statusCode = statusCode;
    this.details = details;

    // Prototype chain 문제 해결 (JS에서 상속된 클래스를 올바르게 사용하기 위해)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function isAppError(payload: unknown): payload is { details: DetailType } {
  console.log(payload);

  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof (payload as any).details === 'object' &&
    typeof (payload as any).details.email === 'string' &&
    typeof (payload as any).details.role === 'string' &&
    typeof (payload as any).details.partnerName === 'string'
  );
}
