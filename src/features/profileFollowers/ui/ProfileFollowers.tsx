'use client'
import React, { useState } from 'react'
import { Popup, usePopup } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import s from './ProfileFollowers.module.scss'

import { Close } from '@/assets/icons/components'
import { VerifyPopup } from '@/widgets'

export type ProfileFollowersProps = {
  onClose?: (value: boolean) => void
}

export const ProfileFollowers = (props: ProfileFollowersProps) => {
  const { onClose, ...rest } = props
  const [isOpenVerifyDeleteModal, setOpenVerifyDeleteModal] = useState(false)
  const { onCloseHandler, onClickHandler } = usePopup({ onClose })
  return (
    <>
      <Popup open={true} {...rest} onOpenChange={onCloseHandler} size={'xl'}>
        <DialogClose
          className={s.close}
          onClick={onClickHandler}
          aria-label="Close Followers dialog"
        >
          <Close />
        </DialogClose>
        {/* <VisuallyHidden asChild>*/}
        {/* </VisuallyHidden>*/}

        <div className={s.wrapper}>
          <DialogTitle className={s.hidden_title}>show post</DialogTitle>
        </div>
      </Popup>
      <VerifyPopup
        title={'Delete Following'}
        isOpenValue={isOpenVerifyDeleteModal}
        onClose={setOpenVerifyDeleteModal}
        data-id={'verify-delete-modal'}
        aria-label="Confirm post deletion"
        onClickYes={() => {
          console.log(131)
        }}
      >
        <span>123123</span>
        {/*<Typography variant={'regular_text_16'} className={s.verify_text}>
          {t('textBody')}
        </Typography>*/}
      </VerifyPopup>
    </>
  )
}
