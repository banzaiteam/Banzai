import { Button, Popup, Textarea, Typography } from '@shared/ui'
import { Close, ImageOutline } from '@/assets/icons/components'
import React from 'react'
import s from './EditPostForm.module.scss'
import Image from 'next/image'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import user from '@/assets/images/User.png'
import { Skeleton } from '@shared/ui/skeleton/Skeleton'
import { SwiperImagesPost } from '@/features'
import { useEditPost } from '@features/edit-post/model/hooks'
import { ClosePostModal } from '@features/edit-post/components'

export type EditPostForm = {
  open: boolean
  onClose: (value: boolean) => void
  postId: string
}

export const EditPostForm = ({ open, onClose, postId }: EditPostForm) => {
  const {
    description,
    setDescription,
    showCloseModal,
    setShowCloseModal,
    maxChars,
    username,
    urlImages,
    isLoading,
    handleRequestClose,
    buttonHandler,
  } = useEditPost({ postId, onClose })

  return (
    <Popup open={open} onOpenChange={handleRequestClose} size={'xl'}>
      <div className={s.title_wrapper}>
        <Typography variant={'h1'}>Edit Post</Typography>
        <button onClick={() => setShowCloseModal(true)}>
          <Close />
        </button>
      </div>
      <div className={s.separator} />
      <div className={s.main_wrapper}>
        <div className={s.image_block}>
          {isLoading ? (
            <Skeleton className={s.skeleton_main_image} aria-label="Loading post content" />
          ) : urlImages ? (
            urlImages.length > 0 && <SwiperImagesPost postImages={urlImages} />
          ) : (
            <ImageOutline
              className={s.io}
              viewBox={'0 0 24 24'}
              width={'150px'}
              height={'150px'}
              aria-hidden="true"
            />
          )}
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
