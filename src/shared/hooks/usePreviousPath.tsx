'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function usePreviousPath(fallbackPath: string) {
  const router = useRouter()

  return useCallback(() => {
    try {
      const previousUrl = sessionStorage.getItem('previous-path')

      const isDirectAccess = !previousUrl
      const hasHistory = window.history.length > 1

      if (isDirectAccess) {
        router.push(fallbackPath)
      } else {
        if (hasHistory) {
          router.back()
        } else {
          router.push(fallbackPath)
        }
      }
    } catch (error) {
      console.error('Navigation error:', error)
      router.push(fallbackPath)
    }
  }, [router, fallbackPath])
}
