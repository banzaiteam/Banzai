import React, { type ComponentPropsWithoutRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import s from './Popup.module.scss'
import { Card } from '@shared/ui'
import { clsx } from 'clsx'

type PopupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type PopupProps = Dialog.DialogProps & {
  width?: number
  size?: PopupSize
}

type PopupHeaderProps = ComponentPropsWithoutRef<'div'>

export const Popup = (props: PopupProps) => {
  const { children, size = 'md', width, ...rest } = props

  return (
    <Dialog.Root {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content style={{ width }} className={clsx(s.content, s[size])}>
          <DialogDescription className={s.description}>модальное окно</DialogDescription>
          <Card className={s.card}>{children}</Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const PopupHeader = (props: PopupHeaderProps) => {
  const { children, className, ...rest } = props

  return (
    <>
      <div className={clsx(className, s.popup_header)} {...rest}>
        {children}
      </div>
      <hr />
    </>
  )
}
