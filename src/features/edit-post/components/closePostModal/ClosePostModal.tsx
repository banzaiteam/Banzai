import { Button, Popup, PopupHeader, Typography } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import s from '@features/showPost/components/verifyModal/VerifyModal.module.scss'
import React from 'react'

type Props = {
  isOpenValue: boolean
  onClose: (value: boolean) => void
  onConfirm: () => void
}

export const ClosePostModal = (props: Props) => {
  const { isOpenValue, onClose, onConfirm } = props

  const onCloseHandler = () => onClose(false)
  const onClickYesHandler = () => {
    onClose(false)
    onConfirm()
  }

  return (
    <Popup open={isOpenValue} onOpenChange={onClose} size={'xs'}>
      <PopupHeader>
        <DialogTitle>Close Post</DialogTitle>
        <DialogClose onClick={onCloseHandler}>
          <Close />
        </DialogClose>
      </PopupHeader>
      <div className={s.wrapper}>
        <Typography variant={'regular_text_16'}>
          Do you really want to close the edition of the publication? If you close changes won’t be
          saved
        </Typography>
        <div className={s.wrapper_buttons}>
          <Button variant="outline" onClick={onClickYesHandler}>
            Yes
          </Button>
          <Button onClick={onCloseHandler}>No</Button>
        </div>
      </div>
    </Popup>
  )
}
