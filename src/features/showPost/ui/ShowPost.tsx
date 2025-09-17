'use client'
import React from 'react'
import Image from 'next/image'
import s from './ShowPost.module.scss'
import {
  EngagementInfo,
  type FindOneUserDataResponse,
  type GetPostDataResponse,
  SwiperImagesPost,
  useDeletePostMutation,
  usePostMeatballsMenuItems,
  useShowPost,
} from '@/features'
import { CircleImage, Popup, Typography } from '@shared/ui'
import { Close, ImageOutline } from '@/assets/icons/components'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { EditPostForm } from '@features/edit-post/ui/EditPostForm'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { MeatballsMenu } from '@widgets/meatballsMenu/ui/MeatballsMenu'
import { AddCommentField } from '@features/showPost/components/addCommentField/AddCommentField'
import { useTranslations } from 'next-intl'
import { DescriptionPost } from '@features/showPost/components/descriptionPost/DescriptionPost'
import { Comments } from '@features/showPost/components/comments/Comments'
import { VerifyPopup } from '@/widgets'

export type ShowPostProps = {
  id?: string
  onClose?: (value: boolean) => void
  initialPostData?: GetPostDataResponse
  initialFindOneUserData: FindOneUserDataResponse
}

export const ShowPost = (props: ShowPostProps) => {
  const {
    onClose,
    id,
    initialPostData,
    initialFindOneUserData: { username, url: avatar },
    ...rest
  } = props
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
    meData,
    post: { description, userId },
  } = useShowPost({ onClose, id, initialPostData })
  const isAuth = !!meData
  const {
    meatballsMenuItems,
    isOpenMeatballsMenu,
    setOpenMeatballsMenu,
    isEditing,
    isOpenVerifyDeleteModal,
    setOpenVerifyDeleteModal,
    handleCloseEditModal,
  } = usePostMeatballsMenuItems(isOwnerPost)
  const [deletePost, { isLoading: deletePostIsLoading }] = useDeletePostMutation()
  const onClickYesHandler = async () => {
    try {
      await deletePost(postId).unwrap()
    } catch (error: unknown) {}
  }
  return (
    <>
      {/*Проблема с Popup на мобильной версии, на desktop всё работает нужно узнать почему срабатывает onOpenChange на мобиле */}
      <Popup {...rest} open={true} onOpenChange={onCloseHandler} size={'xl'}>
        <DialogClose className={s.close} onClick={onClickHandler} aria-label="Close post dialog">
          <Close />
        </DialogClose>
        <VisuallyHidden asChild>
          <DialogTitle className={s.hidden_title}>show post</DialogTitle>
        </VisuallyHidden>
        {/*<Scroll className={s.scroll}>*/}
        {/*<ScrollArea.Root style={{ height: '70vh' }}>
          <ScrollArea.Viewport>*/}
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
                    {username}
                  </Typography>
                )}
              </div>
              {isAuth && (
                <MeatballsMenu
                  items={meatballsMenuItems}
                  isOpen={isOpenMeatballsMenu}
                  toggleOpen={setOpenMeatballsMenu}
                  disabled={isLoading}
                  aria-label="Post-options"
                />
              )}
            </div>
            <Comments comments={comments}>
              {!!description && (
                <DescriptionPost
                  title={username}
                  description={description}
                  image={avatar}
                  userId={userId}
                />
              )}
            </Comments>
            <EngagementInfo postId={postId} postData={initialPostData} />
            {isAuth && <AddCommentField postId={postId} />}
          </div>
        </div>
        {/*  </ScrollArea.Viewport>
        </ScrollArea.Root>*/}
        {/* </Scroll>*/}
      </Popup>
      {isEditing && <EditPostForm postId={postId} open={true} onClose={handleCloseEditModal} />}

      <VerifyPopup
        onClose={setOpenVerifyDeleteModal}
        onClickYes={onClickYesHandler}
        isOpenValue={isOpenVerifyDeleteModal}
        isLoading={deletePostIsLoading}
        title={t('title')}
      >
        <Typography variant={'regular_text_16'} className={s.verify_text}>
          {t('textBody')}
        </Typography>
      </VerifyPopup>
    </>
  )
}
