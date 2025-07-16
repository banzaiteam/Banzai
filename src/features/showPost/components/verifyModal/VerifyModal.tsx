'use client'
import React, { type ReactNode } from 'react'
import { Button, Popup, PopupHeader } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from './VerifyModal.module.scss'
import { useDeletePostMutation } from '@/features'
import { Loading } from '../loading/Loading'

type Props = {
  title?: string
  isOpenValue: boolean
  onClose: (value: boolean) => void
  children: ReactNode
}

export const VerifyModal = (props: Props) => {
  const { isOpenValue, children, title = 'Email sent', onClose } = props
  const onCloseHandler = () => onClose(false)

  const [deletePost, { isLoading }] = useDeletePostMutation()

  const onClickYesHandler = async () => {
    await deletePost({ id: '1' }).unwrap()
    onCloseHandler()
  }

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
          <Button disabled={isLoading} variant="outline" onClick={onClickYesHandler}>
            {isLoading ? <Loading /> : 'Yes'}
          </Button>
          <Button onClick={onCloseHandler}>No</Button>
        </div>
      </div>
    </Popup>
  )
}
