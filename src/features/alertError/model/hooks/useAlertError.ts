import { useAppSelector } from '@shared/hooks/useAppSelector'
import { clearAppError, selectAppError } from '@shared/store/slices/appSlice'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'

export const useAlertError = () => {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()
  const onCloseHandler = (isOpen: boolean) => {
    if (!isOpen) {
      dispatch(clearAppError())
    }
  }
  return { error, onCloseHandler }
}
