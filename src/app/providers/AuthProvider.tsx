'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@shared/ui/header/Header'
import { Skeleton, SkeletonCircle, SkeletonRect } from '@shared/ui/skeleton/Skeleton'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data, isLoading, isError, error } = useGetMeQuery()

  useEffect(() => {
    if (!isLoading && isError) {
      const status = (error as any)?.status
      const isAuthPage =
        pathname === '/auth/signIn' ||
        pathname === '/signup' ||
        pathname === '/auth/forgot-password' ||
        pathname === '/auth/restore-password' ||
        pathname === '/email-verify'

      if ((status === 401 || status === 403) && !isAuthPage) {
        router.replace('/auth/signIn')
      }
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

  return <>{children}</>
}
