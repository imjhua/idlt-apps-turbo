import { Methods, request } from './request'

export type GetRequestType<T> = {
  method: Methods
  url: string
  params?: T
  data?: T
  internal?: boolean
}

export type GetResponseType<T> = T

export const fetchData = async <RequestType, ResponseType>({
  method,
  url,
  params,
  data,
  internal = false,
}: GetRequestType<RequestType>) => {
  return request<GetResponseType<ResponseType>>({
    baseURL: internal ? '/' : undefined,
    method,
    url,
    params,
    data,
  })
}
