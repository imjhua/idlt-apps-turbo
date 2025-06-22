import { cn } from '@repo/ui/lib/utils'
import { format, isDate, parse } from 'date-fns'

export { cn }

export function isInternalAdmin() {
  return process.env['NEXT_PUBLIC_APP_TYPE'] === 'internal'
}

/* NOTE: 하위경로를 포함하는 상위경로를 조회하기 위한 함수  */
/* 특정 경로(path - route.yaml)와 메뉴선택상태를 관리해야 하는 경우, 메뉴에 노출되는 경로를 정의하여 활용 */
export const PATHNAME_TO_MENU_ROUTE: Record<string, string> = {
  '/vehicle/[param]/accident-history': '/vehicle/list',
  '/vehicle/[param]/basic-info': '/vehicle/list',
  '/vehicle/[param]/commute-history': '/vehicle/list',
  '/vehicle/[param]/event-log': '/vehicle/list',
  '/vehicle/[param]/maintenance-history': '/vehicle/list',
  '/vehicle/[param]/operating-history': '/vehicle/list',
  '/vehicle/[param]/operating-stats': '/vehicle/list',
  '/vehicle/[param]/status-info': '/vehicle/list',
  '/infra/partner/[param]': '/infra/partner',
  '/infra/vehicle-model/[param]': '/infra/vehicle-model',
  '/infra/avkit-model/[param]': '/infra/avkit-model',
  '/account/[param]': '/account/list',
}

/* FIXME: pathname에 ID와 같이 동적으로 변하는 경로를 처리하기 위해 replace를 사용하며 현재는 숫자만 대응되어 있음 */
const REGEX_FOR_PATH_PARMA = /(?<=\/)\d+(?=\/|$)/g
export function normalizePathForRoute(pathname: string): string {
  return pathname.replace(REGEX_FOR_PATH_PARMA, '[param]') || ''
}

export function extractValues(obj: Record<string, string[]>): string[] {
  return Object.values(obj).flat()
}

/* TODO: DATE util 만 따로 분리할까? */
export const DATE_FORMAT = 'yy.MM.dd'
export const DATE_TIME_FORMAT = 'yy.MM.dd kk:mm:ss'
export const DATE_FORMAT_FOR_QUERY_PARAM = 'yyyy-MM-dd'
type formatDateType = {
  date:
    | {
        from: Date
        to?: Date
      }
    | Date
    | string
  dateFormat?: string
}

export const formatDate = ({ date, dateFormat = DATE_FORMAT }: formatDateType) => {
  if (typeof date === 'string') {
    return format(date, dateFormat)
  }

  if (isDate(date)) {
    return format(date, dateFormat)
  }

  if (typeof date === 'object') {
    const { from, to } = date

    if (from && to) {
      const fromText = format(from, dateFormat)
      const toText = format(to, dateFormat)
      if (fromText === toText) {
        return fromText
      }

      return `${fromText} - ${toText}`
    }
    if (from) {
      return format(from, dateFormat)
    }
  }

  return '-'
}

export function formatNumberWithCommas(value: number | string): string {
  const number = typeof value === 'number' ? value : parseFloat(value)
  if (isNaN(number)) {
    throw new Error('Invalid number input')
  }
  return number.toLocaleString('en-US')
}

// CHECK : Zod schema that validates a phone number using `libphonenumber-js`.
export const phoneRegex = /^(02|0[0-9]{2})-?([0-9]{3,4})-?([0-9]{4})$/
export function formatPhoneNumber(phoneNumber?: string) {
  if (!phoneNumber) {
    return phoneNumber
  }

  const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '')
  const match = cleanedNumber.match(phoneRegex)

  if (match) {
    const areaCode = match[1]
    const middleNumber = match[2]
    const lastNumber = match[3]

    return `${areaCode}-${middleNumber}-${lastNumber}`
  } else {
    return phoneNumber
  }
}

export function getStatusMap(
  status: readonly { value: string; text: string }[],
): Record<string, string> {
  const statusMap = status.reduce<Record<string, string>>((data, { value, text }) => {
    if (!Object.prototype.hasOwnProperty.call(data, value)) {
      data[value] = text
    }
    return data
  }, {})

  return statusMap
}

export function groupBy<T>(data: T[], property: keyof T): Record<string, T[]> {
  return data.reduce((acc: Record<string, T[]>, obj: T) => {
    const key = String(obj[property]) // key가 number 등일 수도 있으므로 문자열로 변환
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

export function convertToQueryParamDateFormat(dateString: string): string {
  if (!dateString) {
    return dateString
  }

  const date = parse(dateString, DATE_FORMAT, new Date())

  return format(date, DATE_FORMAT_FOR_QUERY_PARAM)
}
