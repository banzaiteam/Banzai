'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Skeleton, SkeletonCircle, SkeletonRect } from '@shared/ui/skeleton/Skeleton'
import { isPublicRoute, ROUTES } from '@shared/constants/routes'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data, isLoading, isError, error } = useGetMeQuery()
  const [shouldRender, setShouldRender] = useState(false)

  const isPublicPage = isPublicRoute(pathname)

  useEffect(() => {
    if (isLoading) return

    const status = (error as any)?.status
    const isAuthError = status === 401 || status === 403
    console.log(isPublicPage, isAuthError)

    if (!isPublicPage && isAuthError) {
      // router.replace(ROUTES.signIn)
    } else {
      // Разрешаем рендер только когда проверка завершена
      setShouldRender(true)
    }
  }, [isError, isLoading, error, router, pathname, isPublicPage])

  if (isLoading) {
    return (
      <>
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
