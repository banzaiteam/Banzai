// hooks/useNavigationTracker.ts
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useNavigationTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Получаем текущий полный путь с параметрами
    const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    console.log(currentPath)
    // Получаем предыдущий путь из sessionStorage
    const prevPath = sessionStorage.getItem('current-path')

    // Сохраняем предыдущий путь в отдельное поле
    if (prevPath && prevPath !== currentPath) {
      sessionStorage.setItem('previous-path', prevPath)
    }

    // Обновляем текущий путь
    sessionStorage.setItem('current-path', currentPath)
  }, [pathname, searchParams])
}
