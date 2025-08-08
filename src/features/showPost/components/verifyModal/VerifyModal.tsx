'use client'
import React, { type ReactNode } from 'react'
import { Button, Popup, PopupHeader } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from './VerifyModal.module.scss'
import { useDeletePostMutation } from '@/features'
import { Loading } from '../loading/Loading'
import { useRouter } from 'next/navigation'

type Props = {
  id: string
  title?: string
  isOpenValue: boolean
  onClose: (value: boolean) => void
  children: ReactNode
}

export const VerifyModal = (props: Props) => {
  const { isOpenValue, children, id, title = 'Email sent', onClose } = props
  const onCloseHandler = () => onClose(false)
  const router = useRouter()
  const [deletePost, { isLoading }] = useDeletePostMutation()

  const onClickYesHandler = async () => {
    try {
      await deletePost(id).unwrap()
      onCloseHandler()

      router.back() /*Заменить?*/
    } catch (error: any) {
    } finally {
      onCloseHandler()
    }
  }

  return (
    <Popup open={isOpenValue} onOpenChange={onClose} size={'xs'}>
      <PopupHeader>
        <DialogTitle>{title}</DialogTitle>
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
            {isLoading ? <Loading /> : 'Yes'}
          </Button>
          <Button onClick={onCloseHandler} data-id={'verify-delete-modal-no-btn'}>
            No
          </Button>
        </div>
      </div>
    </Popup>
  )
}
