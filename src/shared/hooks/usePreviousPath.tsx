'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function usePreviousPath(fallbackPath: string) {
  const router = useRouter()

  return useCallback(() => {
    const currentOrigin = window.location.origin
    const previousUrl = document.referrer
    console.log(previousUrl)
    // Проверяем, был ли переход с того же домена
    const isInternal = () => {
      if (!previousUrl) return false
      try {
        return new URL(previousUrl).origin === currentOrigin
      } catch {
        return false
      }
    }

    // Проверяем, открыта ли страница недавно

    // Определяем тип навигации
    const isDirectAccess = !previousUrl
    const hasHistory = window.history.length > 1

    // Главное исправление: Для прямого захода всегда используем fallbackPath
    if (isDirectAccess) {
      window.location.href = fallbackPath
      return
    }

    // Для внутренних переходов
    if (isInternal()) {
      if (hasHistory) {
        router.back()
        console.log('back')
      } else {
        router.push(fallbackPath)
      }
    }
    // Для внешних переходов
    else {
      router.push(fallbackPath)
    }
  }, [router, fallbackPath])
}
