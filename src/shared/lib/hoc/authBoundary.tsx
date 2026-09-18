'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ROUTES } from '@shared/constants/routes'

type AccessType = 'guest-only' | 'auth-only' | 'public'

interface Props {
  children: React.ReactNode
  access: AccessType
  redirectTo?: string // куда редиректить если доступ запрещён
}

export function AuthBoundary({ children, access, redirectTo }: Props) {
  const { data: user, isLoading } = useGetMeQuery()
  const router = useRouter()
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const isAuth = Boolean(user)

    // Определяем нужно ли редиректить
    if (access === 'auth-only' && !isAuth) {
      router.replace(redirectTo || ROUTES.signIn)
    } else if (access === 'guest-only' && isAuth) {
      router.replace(redirectTo || ROUTES.home)
    } else {
      setShouldRender(true)
    }
  }, [isLoading, user, pathname, access, router, redirectTo])

  return shouldRender ? <>{children}</> : null
}
