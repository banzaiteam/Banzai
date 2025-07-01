'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@shared/ui/header/Header'
import { Skeleton, SkeletonCircle, SkeletonRect } from '@shared/ui/skeleton/Skeleton'
import { AUTH_PAGES } from '@/app/providers/publicPages'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data, isLoading, isError, error } = useGetMeQuery()
  const [shouldRender, setShouldRender] = useState(false)

  //const isPublicPage = AUTH_PAGES.includes(pathname)

  const isPublicPage =
    AUTH_PAGES.some(page => pathname === page) || pathname?.startsWith('/auth/restore-password/')

  useEffect(() => {
    if (isLoading) return

    const status = (error as any)?.status
    const isAuthError = status === 401 || status === 403

    // Если страница защищена и пользователь не авторизован
    if (!isPublicPage && isAuthError) {
      router.replace('/auth/signIn')
    } else {
      // Разрешаем рендер только когда проверка завершена
      setShouldRender(true)
    }
  }, [isError, isLoading, error, router])

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{ padding: '16px', maxWidth: '100%' }}>
          <Skeleton width="100%" height="500px" borderRadius="8px">
            <div style={{ display: 'flex', gap: '12px', padding: '12px' }}>
              <SkeletonCircle size="48px" />
              <div style={{ flex: 1 }}>
                <SkeletonRect width="70%" height="16px" />
                <SkeletonRect width="50%" height="12px" />
              </div>
            </div>
          </Skeleton>
        </div>
      </>
    )
  }

  return shouldRender ? <>{children}</> : null
}
