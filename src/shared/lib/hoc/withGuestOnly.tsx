'use client'

import { useGetMeQuery } from '@/shared/api/userApi'
import { useRouter } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'
import { Skeleton, SkeletonCircle, SkeletonRect } from '@shared/ui/skeleton/Skeleton'

//export function withGuestOnly<T extends JSX.IntrinsicAttributes>(
export function withGuestOnly<T extends object>(Component: React.ComponentType<T>) {
  return function GuestOnlyWrapper(props: T) {
    const { data, isLoading } = useGetMeQuery()
    const router = useRouter()
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
      if (isLoading) return

      if (data) {
        router.replace('/')
      } else {
        setShouldRender(true)
      }
    }, [data, isLoading])

    if (isLoading)
      return (
        <div style={{ padding: '16px', maxWidth: '400px' }}>
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
      )

    if (data) return null // можно заменить на Skeleton

    return shouldRender ? <Component {...props} /> : null
  }
}
