'use client'

import React, { type ReactNode } from 'react'
import { Button, Popup, PopupHeader } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from './EmailSentPopup.module.scss'

type EmailSentPopupProps = {
  title?: string
  isOpenValue: boolean
  onClose: (value: boolean) => void
  children: ReactNode
}

export const EmailSentPopup = (props: EmailSentPopupProps) => {
  const { isOpenValue, children, title = 'Email sent', onClose } = props

  const onCloseHandler = () => onClose(false)

  return (
    <Popup size={'xs'} open={isOpenValue} onOpenChange={onClose}>
      <PopupHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogClose onClick={onCloseHandler}>
          <Close />
        </DialogClose>
      </PopupHeader>
      <div className={s.popup_body}>
        {children}
        <div style={{ textAlign: 'right' }}>
          <Button variant="primary" onClick={onCloseHandler}>
            OK
          </Button>
        </div>
      </div>
    </Popup>
  )
}
