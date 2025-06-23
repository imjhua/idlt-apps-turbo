import { Methods, request } from '@/lib/request'
import { MenuItemType } from '@/types/menu'


/* FIXME: 타입정의시 semicolon 형식 맞추기 - 린트? 프리티어? */
export type GetMenuRequestType = undefined

export type GetMenuResponseType = { menus: MenuItemType[] }

export const getMenu = async (baseURL: string) => {
  return await request<GetMenuResponseType>({
    baseURL: baseURL,
    url: '/api/menus',
    method: Methods.GET,
  })
}
