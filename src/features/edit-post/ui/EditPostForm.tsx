import { Button, Popup, Textarea, Typography } from '@shared/ui'
import { DialogClose } from '@radix-ui/react-dialog'
import { Close } from '@/assets/icons/components'
import React, { useState } from 'react'
import s from './EditPostForm.module.scss'
import Image from 'next/image'
import Palm from '@/assets/images/Palm.png'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import user from '@/assets/images/User.png'
import { useGetMeQuery } from '@shared/api/userApi'

type EditPostForm = {
  open: boolean
  onClose: (value: boolean) => void
}

export const EditPostForm = (props: EditPostForm) => {
  const { onClose, ...rest } = props
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. кееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееррррррррррррррррррррррррррррррррррррррррррррррррррррррррр'
  )
  const maxChars = 500

  const { data } = useGetMeQuery()
  const username = data?.username

  return (
    <Popup onOpenChange={onClose} size={'xl'} {...rest}>
      <div className={s.title_wrapper}>
        <Typography variant={'h1'}>Edit Post</Typography>
        <DialogClose>
          <Close />
        </DialogClose>
      </div>
      <div className={s.separator} />
      <div className={s.main_wrapper}>
        <div className={s.image_block}>
          <Image src={Palm} width={500} height={500} alt={'main-image post'} />
        </div>
        <div className={s.content_block}>
          <div className={s.user}>
            <CircleImage>
              <Image src={user} alt={'user'} />
            </CircleImage>
            <Typography variant={'h3'}>{username}</Typography>
          </div>
          <div className={s.description_block}>
            <Textarea
              className={s.textarea}
              title={'Add publication descriptions'}
              //defaultValue={description}
              placeholder={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={maxChars}
            />
            <Typography variant="small_text" className={s.char_counter}>
              {`${description.length}/${maxChars}`}
            </Typography>
          </div>
          <div className={s.button_wrapper}>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </Popup>
  )
}
