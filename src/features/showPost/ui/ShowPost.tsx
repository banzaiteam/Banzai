'use client'
import React from 'react'
import Image from 'next/image'
import s from './ShowPost.module.scss'
import {
  Comment,
  EngagementInfo,
  type PostDataResponse,
  SkeletonComment,
  SwiperImagesPost,
  usePostMeatballsMenuItems,
  useShowPost,
  VerifyModal,
} from '@/features'
import { CircleImage, Popup, Scroll, Typography } from '@shared/ui'
import { Close, ImageOutline } from '@/assets/icons/components'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { EditPostForm } from '@features/edit-post/ui/EditPostForm'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { MeatballsMenu } from '@widgets/meatballsMenu/ui/MeatballsMenu'

import user from '@/assets/images/User.png'
import { AddCommentField } from '@features/showPost/components/addCommentField/AddCommentField'
import { useTranslations } from 'next-intl'
import { DescriptionPost } from '@features/showPost/components/descriptionPost/DescriptionPost'

export type ShowPostProps = {
  onClose?: (value: boolean) => void
  id?: string
  initialPostData?: PostDataResponse
}

export const ShowPost = (props: ShowPostProps) => {
  const { onClose, id, initialPostData, ...rest } = props
  const t = useTranslations('VerifyDeleteModal')
  const {
    onCloseHandler,
    onClickHandler,
    isFetching,
    isLoading,
    urlImages,
    comments,
    postId,
    isOwnerPost,
    post: { description, userId, avatar },
  } = useShowPost({ onClose, id, initialPostData })
  const {
    meatballsMenuItems,
    isOpenMeatballsMenu,
    setOpenMeatballsMenu,
    isEditing,
    isOpenVerifyDeleteModal,
    setOpenVerifyDeleteModal,
    handleCloseEditModal,
  } = usePostMeatballsMenuItems(isOwnerPost)
  const commentsMapped = comments?.map(({ text, likes, userId, id }) => {
    const { like, image, title } = { title: 'userName', image: user, like: false }
    return (
      <Comment
        key={id}
        userId={userId}
        text={text}
        title={title}
        image={image}
        like={like}
        likes={likes}
      />
    )
  })
  return (
    <>
      <Popup open={true} {...rest} onOpenChange={onCloseHandler} size={'xl'}>
        <DialogClose className={s.close} onClick={onClickHandler} aria-label="Close post dialog">
          <Close />
        </DialogClose>
        <VisuallyHidden asChild>
          <DialogTitle className={s.hidden_title}>show post</DialogTitle>
        </VisuallyHidden>
        <Scroll>
          <div className={s.wrapper} aria-busy={isFetching}>
            <div className={s.image_wrapper}>
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

            <div className={s.comments_block}>
              <div className={s.header}>
                <div className={s.user}>
                  {isLoading ? (
                    <SkeletonCircle size={36} aria-label="Loading user avatar" />
                  ) : (
                    <CircleImage>
                      <Image src={avatar} alt={'User profile picture'} width={36} height={36} />
                    </CircleImage>
                  )}

                  {isLoading ? (
                    <Skeleton width={'100px'} aria-label="Loading username" />
                  ) : (
                    <Typography variant={'h3'} id="post-username">
                      UserName
                    </Typography>
                  )}
                </div>
                <MeatballsMenu
                  items={meatballsMenuItems}
                  isOpen={isOpenMeatballsMenu}
                  toggleOpen={setOpenMeatballsMenu}
                  disabled={isLoading}
                  aria-label="Post-options"
                />
              </div>
              <Scroll className={s.scroll} aria-label="Post comments">
                <div className={s.comments}>
                  {isLoading ? (
                    <>
                      <SkeletonComment />
                      <SkeletonComment />
                    </>
                  ) : (
                    <>
                      {!!description && (
                        <DescriptionPost
                          title={'userName'}
                          description={description}
                          image={avatar}
                          userId={userId}
                        />
                      )}
                      {commentsMapped}
                    </>
                  )}
                </div>
              </Scroll>
              <EngagementInfo postId={postId} postData={initialPostData} />
              <AddCommentField postId={postId} />
            </div>
          </div>
        </Scroll>
      </Popup>
      {isEditing && <EditPostForm postId={postId} open={true} onClose={handleCloseEditModal} />}
      <VerifyModal
        id={postId}
        title={t('title')}
        isOpenValue={isOpenVerifyDeleteModal}
        onClose={setOpenVerifyDeleteModal}
        data-id={'verify-delete-modal'}
        aria-label="Confirm post deletion"
      >
        <Typography variant={'regular_text_16'} className={s.verify_text}>
          {t('textBody')}
        </Typography>
      </VerifyModal>
    </>
  )
}
