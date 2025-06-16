import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/ui/collapsible';
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
} from '@repo/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { normalizePathForRoute, PATHNAME_TO_MENU_ROUTE } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { MenuItemType } from '@/types/menu';
interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  menus: MenuItemType[];
  sidebarOpen?: boolean;
}

export function AppSidebar({ menus, sidebarOpen, ...props }: SidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src="/img_64_logo@2x.png" width="32" height="32" alt="logo" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">IDLT Apps</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex p-2">
        <SidebarMenu className="gap-0">
          {menus.map(({ name, icon, sub_menus }, index) => {
            if (sub_menus.length === 1 && sub_menus[0]) {
              const { name, path } = sub_menus[0];
              const pathnameForSubpath = PATHNAME_TO_MENU_ROUTE[normalizePathForRoute(pathname)];

              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === path || path === pathnameForSubpath}
                  >
                    <Link href={path}>
                      {icon && <DynamicIcon name={icon} />}
                      <span>{name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            return (
              <Collapsible key={index} asChild defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  {!sidebarOpen && sub_menus[0]?.path ? (
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === sub_menus[0].path ||
                        PATHNAME_TO_MENU_ROUTE[normalizePathForRoute(pathname)] ===
                          sub_menus[0].path
                      }
                    >
                      <Link href={sub_menus[0].path}>{icon && <DynamicIcon name={icon} />}</Link>
                    </SidebarMenuButton>
                  ) : (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {icon && <DynamicIcon name={icon} />}
                          <span>{name}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {sub_menus.map(({ name: subName, path }) => {
                            const pathnameForSubpath =
                              PATHNAME_TO_MENU_ROUTE[normalizePathForRoute(pathname)];
                            const isSelected = pathname === path || pathnameForSubpath === path;

                            return (
                              <SidebarMenuSubItem key={subName}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={path}
                                    className={cn(
                                      isSelected &&
                                        'bg-sidebar-primary text-sidebar-primary-foreground rounded-sm font-bold',
                                    )}
                                  >
                                    <span>{subName}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
