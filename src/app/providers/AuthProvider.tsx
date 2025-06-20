'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data, isLoading, isError, error } = useGetMeQuery()

  useEffect(() => {
    if (!isLoading && isError) {
      const status = (error as any)?.status
      const isAuthPage = pathname === '/auth/signIn' || pathname === '/signup'

      if ((status === 401 || status === 403) && !isAuthPage) {
        router.replace('/auth/signIn')
      }
    }
  }, [isError, isLoading, error, router])

  if (isLoading) {
    return <div className="p-4 text-center">Загрузка профиля...</div>
  }

  return <>{children}</>
}
