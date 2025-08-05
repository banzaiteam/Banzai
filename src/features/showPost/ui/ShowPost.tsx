'use client'
import React from 'react'
import Image from 'next/image'
import s from './ShowPost.module.scss'
import {
  Comment,
  EngagementInfo,
  SkeletonComment,
  SwiperImagesPost,
  usePostItems,
  useShowPost,
  VerifyModal,
} from '@/features'
import { Button, CircleImage, Popup, Scroll, Typography } from '@shared/ui'
import { Close, ImageOutline } from '@/assets/icons/components'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { EditPostForm } from '@features/edit-post/ui/EditPostForm'
import { type PostDataResponse } from '@features/showPost/api/api'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { MeatballsMenu } from '@widgets/meatballsMenu/ui/MeatballsMenu'
import { MOC_COMMENTS_DATA } from '@features/showPost/model/constans'
import user from '@/assets/images/User.png'

export type ShowPostProps = {
  onClose?: (value: boolean) => void
  id?: string
  postData?: PostDataResponse
}

export const ShowPost = (props: ShowPostProps) => {
  const { onClose, id, postData, ...rest } = props

  const {
    onCloseHandler,
    onClickHandler,
    isFetching,
    urlImages,
    meData,
    postId,
    inputValue,
    setInputValue,
  } = useShowPost({ onClose, id, postData })
  const {
    postItems,
    isOpenMeatballsMenu,
    setOpenMeatballsMenu,
    isEditing,
    isOpenVerifyDeleteModal,
    setOpenVerifyDeleteModal,
    handleCloseEditModal,
  } = usePostItems()

  const commentsMapped = MOC_COMMENTS_DATA.map(({ title, textBody, like, image }, index) => {
    return <Comment key={index} text={textBody} title={title} image={image} like={like} />
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
              {isFetching ? (
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
                  {isFetching ? (
                    <SkeletonCircle size={36} aria-label="Loading user avatar" />
                  ) : (
                    <CircleImage>
                      <Image src={user} alt={'User profile picture'} width={36} height={36} />
                    </CircleImage>
                  )}

                  {isFetching ? (
                    <Skeleton width={'100px'} aria-label="Loading username" />
                  ) : (
                    <Typography variant={'h3'} id="post-username">
                      UserName
                    </Typography>
                  )}
                </div>
                {meData && (
                  <MeatballsMenu
                    items={postItems}
                    isOpen={isOpenMeatballsMenu}
                    toggleOpen={setOpenMeatballsMenu}
                    disabled={isFetching}
                    aria-label="Post-options"
                  />
                )}
              </div>

              <Scroll className={s.scroll} aria-label="Post comments">
                <div className={s.comments}>
                  {isFetching ? (
                    <>
                      <SkeletonComment />
                      <SkeletonComment />
                    </>
                  ) : (
                    <>{commentsMapped}</>
                  )}
                </div>
              </Scroll>
              <EngagementInfo postId={postId} postData={postData} />
              <div className={s.add_comment}>
                <div className={s.add_comment_wrapper} aria-label="Add a comment">
                  <input
                    id="comment-input"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.currentTarget.value)
                    }}
                    type="text"
                    placeholder={'Add a Comment...'}
                    disabled={isFetching}
                    aria-required="true"
                  />

                  <Button
                    disabled={isFetching}
                    variant={'text-button'}
                    type={'button'}
                    aria-label="Publish comment"
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </Popup>
      {isEditing && <EditPostForm postId={postId} open={true} onClose={handleCloseEditModal} />}
      <VerifyModal
        title={'Delete Post'}
        isOpenValue={isOpenVerifyDeleteModal}
        onClose={setOpenVerifyDeleteModal}
        data-id={'verify-delete-modal'}
        aria-label="Confirm post deletion"
      >
        <Typography variant={'regular_text_16'} className={s.verify_text}>
          Are you sure you want to delete this post?
        </Typography>
      </VerifyModal>
    </>
  )
}
