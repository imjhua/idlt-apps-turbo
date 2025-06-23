import { IconName } from 'lucide-react/dynamic'

export type MenuItemType = {
  name: string
  icon: IconName
  path: string
  sub_menus: readonly { name: string; path: string }[]
}

export type MenusConfigType = {
  menus: MenuItemType[]
}
