// hooks/useNavigationTracker.ts
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useNavigationTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Очищаем при полном уходе со страницы
      sessionStorage.removeItem('previous-path')
    }

    const handlePopState = () => {
      // Проверяем, остались ли мы в пределах нашего домена
      if (!document.referrer || new URL(document.referrer).origin !== window.location.origin) {
        sessionStorage.removeItem('previous-path')
      }
    }

    // Текущий путь при монтировании
    const currentPath = `${pathname}`
    const prevPath = sessionStorage.getItem('current-path')

    // Сохраняем предыдущий путь только если он с нашего домена
    if (prevPath && prevPath !== currentPath) {
      try {
        const prevUrl = new URL(prevPath, window.location.origin)
        if (prevUrl.origin === window.location.origin) {
          sessionStorage.setItem('previous-path', prevPath)
        }
      } catch {
        sessionStorage.removeItem('previous-path')
      }
    }

    // Всегда обновляем текущий путь
    sessionStorage.setItem('current-path', currentPath)

    // Обработчики событий
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname])
}
