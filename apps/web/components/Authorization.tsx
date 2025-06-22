'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { useGrant } from '@/context/GrantProvider'
import { normalizePathForRoute } from '@/lib/utils'
import { GrantType } from '@/types/role'

type AuthorizationProps = {
  permission: GrantType
  children: (disabled: boolean) => ReactNode
}

export default function Authorization({ permission, children }: AuthorizationProps) {
  const { grant } = useGrant()
  const pathname = usePathname()

  const isDisabled = useMemo(() => {
    const path = normalizePathForRoute(pathname)

    return !grant![path]?.includes(permission)
  }, [grant, pathname, permission])

  return <>{children(isDisabled)}</>
}
