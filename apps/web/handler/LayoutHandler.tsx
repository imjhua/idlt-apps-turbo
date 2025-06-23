'use client'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@repo/ui/sidebar'
import { Moon, Sun } from 'lucide-react'
import { ReactNode } from 'react'

import { GetMenuResponseType } from '@/apis/internal'
import { AppSidebar } from '@/components/AppSidebar'
import Logo from '@/components/Logo'
import webConfig from '@/config/web.yaml'
import { useTheme } from '@/handler/ThemeProvider'
import { WebConfigType } from '@/types/web'

const { email } = (webConfig as WebConfigType)

export default function LayoutHandler({
  children,
  menuData,
}: {
  children: ReactNode
  menuData: GetMenuResponseType
}) {
  const { theme, toggle } = useTheme();


  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar menus={menuData.menus} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear sticky top-0 z-50 bg-background">
          <div className="flex flex-1 items-center px-5">
            <SidebarTrigger className="[&_svg]:size-8 [&_svg]:size-8">
              <Logo width={48} height={48} />
            </SidebarTrigger>
            <div className="ml-auto flex items-center h-4">
              <span className="rounded-full text-sm font-medium">{email}</span>
              <span className="border-l h-6 mx-3" />
              <button
                aria-label="다크모드 토글"
                onClick={toggle}
                className="rounded-full hover:bg-accent transition"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
        <div className="py-6 px-6 h-[calc(100vh-4rem)] flex flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
