import React, { type ReactNode } from 'react'
import { Button, Popup, PopupHeader } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from './VerifyModal.module.scss'
type Props = {
  title?: string
  isOpenValue: boolean
  onClose: (value: boolean) => void
  children: ReactNode
}

export const VerifyModal = (props: Props) => {
  const { isOpenValue, children, title = 'Email sent', onClose } = props
  const onCloseHandler = () => onClose(false)
  return (
    <Popup open={isOpenValue} onOpenChange={onClose} size={'xs'}>
      <PopupHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogClose onClick={onCloseHandler}>
          <Close />
        </DialogClose>
      </PopupHeader>
      <div className={s.wrapper}>
        {children}
        <div className={s.wrapper_buttons}>
          <Button variant="outline" onClick={onCloseHandler}>
            Yes
          </Button>
          <Button onClick={onCloseHandler}>No</Button>
        </div>
      </div>
    </Popup>
  )
}
