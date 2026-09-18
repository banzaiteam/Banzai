'use client'

import { usePreviousPath } from '@/features'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type UsePopupData = {
  onClose?: (value: boolean) => void
  path?: string
}

export const usePopup = ({ onClose, path = '' }: UsePopupData) => {
  const router = useRouter()
  const routerBack = usePreviousPath(path)
  const back = !!path ? routerBack : router.back

  const onCloseHandler = useCallback(() => {
    onClose?.(false)
    back()
  }, [])
  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCloseHandler()
      e.preventDefault()
    },
    [onCloseHandler]
  )

  return { onCloseHandler, onClickHandler }
}
