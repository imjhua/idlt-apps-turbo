import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@repo/ui/sidebar'
import { DynamicIcon } from 'lucide-react/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import webConfig from '@/config/web.yaml'
import { normalizePathForRoute, PATHNAME_TO_MENU_ROUTE } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { MenuItemType } from '@/types/menu'
import { WebConfigType } from '@/types/web'

import Logo from './Logo'

const { brand } = (webConfig as WebConfigType)

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  menus: MenuItemType[]
}

export function AppSidebar({ menus, ...props }: SidebarProps) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isMobile ? (
          <div className="flex flex-start items-center gap-2 p-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <Logo width={32} height={32} />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-bold">{brand}</span>
            </div>
          </div>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/" onClick={handleMenuClick}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Logo width={32} height={32} />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-bold">{brand}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent className="flex p-2">
        <SidebarMenu className="gap-0">
          {menus.map(({ name, icon, path, sub_menus }, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={pathname === (path || sub_menus[0]?.path)}
              >
                <Link href={path || sub_menus[0]?.path || "/"} onClick={handleMenuClick}>
                  {icon && <DynamicIcon name={icon} />}
                  <span>{name}</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                {sub_menus.map(({ name: subName, path: subPath }) => {
                  const pathnameForSubpath = PATHNAME_TO_MENU_ROUTE[normalizePathForRoute(pathname)]
                  const isSelected = pathname === subPath || pathnameForSubpath === subPath
                  return (
                    <SidebarMenuSubItem key={subName}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          href={subPath}
                          className={cn(
                            isSelected &&
                              'bg-sidebar-primary text-sidebar-primary-foreground rounded-sm font-bold',
                          )}
                          onClick={handleMenuClick}
                        >
                          <span>{subName}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
