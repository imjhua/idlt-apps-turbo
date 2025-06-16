'use client'

import { Separator } from '@repo/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@repo/ui/sidebar'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { normalizePathForRoute } from '@/lib/utils'
import { GetMenuResponseType } from '@/apis/internal'
import { AppSidebar } from '@/components/AppSidebar'
// import { Notification } from '@/components/Notification'


export default function LayoutHandler({ children, menuData }: { children: ReactNode; menuData: GetMenuResponseType }) {
  const pathname = usePathname()

  const [txtMenu, setTxtMenu] = useState<string>()

  useEffect(() => {
    const currentMenuName = (() => {
      const pathnameForSubpath = normalizePathForRoute(pathname)
      for (const item of menuData.menus) {
        for (const sub of item.sub_menus) {
          if (sub.path === pathname || sub.path === pathnameForSubpath) {
            return sub.name
          }
        }
      }
    })()

    setTxtMenu(currentMenuName)
  }, [menuData, pathname])

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar menus={menuData.menus} sidebarOpen />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <div className="flex flex-1 items-center gap-2 px-5">
            <SidebarTrigger className="-ml-1" />
            {txtMenu && (<>
              <Separator orientation="vertical" className="m-0 h-4" />
              <div>{txtMenu}</div>
            </>)}
            <div className="ml-auto flex space-x-4 items-center h-4">
              {/* FIXME: 알림관련 스펙은 미정 */}
              {/* <Notification />
              <Separator orientation="vertical" className="m-0" /> */}
              프로필 영역
            </div>
          </div>
        </header>
        <div className="py-9 px-10 h-[calc(100vh-4rem)] flex flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
