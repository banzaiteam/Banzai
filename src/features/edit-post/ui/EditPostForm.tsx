'use client'
import { Button, Popup, Textarea, Typography } from '@shared/ui'
import { Close } from '@/assets/icons/components'
import React, { useEffect, useState } from 'react'
import s from './EditPostForm.module.scss'
import Image from 'next/image'
import Palm from '@/assets/images/Palm.png'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import user from '@/assets/images/User.png'
import { useGetMeQuery } from '@shared/api/userApi'
import { useGetPostDataQuery } from '@features/showPost/api/api'
import { useEditPostMutation } from '@features/edit-post/api/editPostApi'
import { ClosePostModal } from '@features/edit-post/components/closePostModal/ClosePostModal'

type EditPostForm = {
  open: boolean
  onClose: (value: boolean) => void
  postId: string
}

export const EditPostForm = (props: EditPostForm) => {
  const { onClose, postId, open } = props
  const [description, setDescription] = useState('')
  const [originalDescription, setOriginalDescription] = useState('')
  const [showCloseModal, setShowCloseModal] = useState(false)
  const maxChars = 500

  const { data: userData } = useGetMeQuery()
  const username = userData?.profile.username

  const { data: postData } = useGetPostDataQuery(postId)
  useEffect(() => {
    const desc = postData?.items?.[0]?.description || ''
    setDescription(desc)
    setOriginalDescription(desc)
  }, [postData])

  const hasChanges = description !== originalDescription
  const handleRequestClose = () => {
    if (hasChanges) {
      setShowCloseModal(true)
    } else {
      onClose(false)
    }
  }

  const [editPost, { isLoading }] = useEditPostMutation()
  const buttonHandler = async () => {
    try {
      await editPost({ id: postId, description }).unwrap()
      onClose(false)
    } catch (error) {
      console.error('Ошибка при редактировании поста:', error)
    }
  }

  return (
    <Popup open={open} onOpenChange={handleRequestClose} size={'xl'}>
      <div className={s.title_wrapper}>
        <Typography variant={'h1'}>Edit Post</Typography>
        {/*<DialogClose onClick={() => setShowCloseModal(true)}>*/}
        {/*  <Close />*/}
        {/*</DialogClose>*/}
        <button onClick={() => setShowCloseModal(true)}>
          <Close />
        </button>
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
              defaultValue={description}
              //placeholder={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={maxChars}
            />
            <Typography variant="small_text" className={s.char_counter}>
              {`${description.length}/${maxChars}`}
            </Typography>
          </div>
          <div className={s.button_wrapper}>
            <Button onClick={buttonHandler} disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {showCloseModal && (
        <ClosePostModal
          isOpenValue={showCloseModal}
          onClose={value => setShowCloseModal(value)}
          onConfirm={() => onClose(false)} //выход из формы без сохранения
        />
      )}
    </Popup>
  )
}
