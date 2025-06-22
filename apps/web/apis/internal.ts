import { Methods, request } from '@/lib/request'
import { MenuItemType } from '@/types/menu'

const BASE_URL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_BASE_URL : '/'

/* FIXME: 타입정의시 semicolon 형식 맞추기 - 린트? 프리티어? */
export type GetMenuRequestType = undefined

export type GetMenuResponseType = { menus: MenuItemType[] }

export const getMenu = async () => {
  return await request<GetMenuResponseType>({
    baseURL: BASE_URL,
    url: '/api/menus',
    method: Methods.GET,
  })
}
