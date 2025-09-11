import { useRouter } from 'next/navigation'
import { useCallback, useRef, useEffect } from 'react'
import { ROUTES } from '@shared/constants/routes'

export const usePostNavigation = () => {
  const router = useRouter()
  const navigationTimer = useRef<NodeJS.Timeout | null>(null)

  // Функция для очистки таймера
  const clearNavigationTimer = useCallback(() => {
    console.log(navigationTimer.current)
    if (navigationTimer.current) {
      clearTimeout(navigationTimer.current)
      navigationTimer.current = null
    }
  }, [])

  const onClickPostHandler = useCallback(
    (userId: string, id: string) => {
      // Сначала очищаем предыдущий таймер (если есть)
      clearNavigationTimer()

      // Переходим на страницу профиля
      router.replace(`${ROUTES.profile(userId)}`)

      // Устанавливаем новый таймер для открытия поста
      navigationTimer.current = setTimeout(() => {
        router.push(`${ROUTES.profile(userId)}/${ROUTES.post(id)}`)
        clearNavigationTimer() // Очищаем таймер после выполнения
      }, 300)
    },
    [router, clearNavigationTimer]
  )
  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      clearNavigationTimer()
    }
  }, [clearNavigationTimer])
  // Возвращаем функцию обработчика и функцию для ручной очистки
  return { onClickPostHandler, clearNavigationTimer }
}
