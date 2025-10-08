import { Loading } from '@/features'
import { useTranslations } from 'next-intl'
import { Button, Popup, PopupHeader } from '@shared/ui'
import { DialogClose } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from './VerifyPopup.module.scss'
import React, { type ReactNode } from 'react'

type Props = {
  /* id: string*/
  title?: string
  isOpenValue?: boolean
  onClose: (value: boolean) => void
  children: ReactNode
  isLoading?: boolean
  onClickYes: () => void
}

export const VerifyPopup = (props: Props) => {
  const {
    isOpenValue = true,
    children,
    onClickYes,
    title = 'Заголовок',
    onClose,
    isLoading = false,
  } = props

  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose(false)
    e.stopPropagation()
  }
  /*const [deletePost, { isLoading }] = useDeletePostMutation()*/
  const t = useTranslations('VerifyDeleteModal')
  const onClickYesHandler = async () => {
    onClickYes()
  }

  return (
    <Popup open={isOpenValue} onOpenChange={onClose} size={'xs'}>
      <PopupHeader title={title}>
        <DialogClose onClick={onCloseHandler}>
          <Close />
        </DialogClose>
      </PopupHeader>
      <div className={s.wrapper} data-id={'meatballs-verify-modal-wrapper'}>
        {children}
        <div className={s.wrapper_buttons}>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={onClickYesHandler}
            data-id={'verify-delete-modal-yes-btn'}
          >
            {isLoading ? <Loading /> : t('YesButton')}
          </Button>
          <Button onClick={onCloseHandler} data-id={'verify-delete-modal-no-btn'}>
            {t('NoButton')}
          </Button>
        </div>
      </div>
    </Popup>
  )
}
