import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import QueryString from 'qs'

type createClientType = {
  baseURL?: string
  /* SEE: https://www.npmjs.com/package/qs */
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
  response?: {
    onSuccess?: (config: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
    onError?: (error: AxiosError) => void
  }
}

export const createClient = ({ baseURL, response }: createClientType) => {
  const client = axios.create({
    baseURL,
    timeout: 100 * 1000, // 단위 ms
    withCredentials: true,
    paramsSerializer: (params) => {
      return QueryString.stringify(params, { arrayFormat: 'repeat' })
    },
  })

  client.interceptors.request.use(onRequestConfig, onRequestError)
  client.interceptors.response.use(
    response?.onSuccess ?? onResponseSuccess,
    response?.onError ?? onResponseError,
  )

  return client
}

const onRequestConfig = (config: InternalAxiosRequestConfig) => {
  return config
}

const onRequestError = (error: AxiosError) => {
  return Promise.reject(error)
}

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data as AxiosResponse
}

const onResponseError = (error: AxiosError) => {
  return Promise.reject(error)
}

/* SEE: 사용시 baseURL 정의하여 사용 */
const client = createClient({ baseURL: undefined })
export const request = <T>(options: AxiosRequestConfig): Promise<T> => {
  return client.request(options)
}

export function isAxiosError(payload: unknown): payload is AxiosError<{ message: string }> {
  return axios.isAxiosError(payload)
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { type AxiosInstance, type AxiosRequestConfig }
