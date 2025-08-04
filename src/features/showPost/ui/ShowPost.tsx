'use client'
import React, { useEffect, useState } from 'react'
import { Button, Popup, Scroll, Typography } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import { Close, Edit2Outline, ImageOutline, TrashOutline } from '@/assets/icons/components'
import s from './ShowPost.module.scss'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import user from '@/assets/images/User.png'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import { MeatballsMenu } from '@widgets/meatballsMenu/ui/MeatballsMenu'
import { VerifyModal } from '@features/showPost/components/verifyModal/VerifyModal'
import type { MeatballsMenuItemData } from '@/widgets'
import { type PostDataResponse, showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { useRouter } from '@/i18n/navigation'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { SkeletonComment } from '@features/showPost/components/skeletonComment/SkeletonComment'
import { Comment, SwiperImagesPost } from '@/features'
import { EngagementInfo } from '@features/showPost/components/engagementInfo/EngagementInfo'

import { EditPostForm } from '@features/edit-post/ui/EditPostForm'
import { store } from '@/app/store'
import { useGetMeQuery } from '@shared/api/userApi'

type ShowPostProps = {
  onClose?: (value: boolean) => void
  id?: string
  postData?: PostDataResponse
}

export const ShowPost = (props: ShowPostProps) => {
  const { onClose, id, postData, ...rest } = props

  const postId = id || postData?.items[0].id

  if (!postId) {
    throw new Error('ID не найден')
  }

  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const [isOpenVerifyDeleteModal, setOpenVerifyDeleteModal] = useState(false)
  const [isOpenMeatballsMenu, setOpenMeatballsMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { data, isFetching } = useGetPostDataQuery(id as string, { skip: !!postData })
  const { data: meData } = useGetMeQuery()

  const dataImages = postData || data
  const urlImages = dataImages?.items[0].files.map(file => file.url)

  const MyPostItems: MeatballsMenuItemData[] = [
    {
      title: 'Edit Post',
      icon: <Edit2Outline />,
      onClick: () => {
        setIsEditing(true)
        setOpenMeatballsMenu(false)
      },
    },
    {
      title: 'Delete Post',
      icon: <TrashOutline />,
      onClick: () => {
        setOpenVerifyDeleteModal(true)
        setOpenMeatballsMenu(false)
      },
    },
  ]
  const onCloseHandler = () => {
    onClose?.(false)
    router.back()
  }
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCloseHandler()
    e.preventDefault()
  }
  const handleCloseEditModal = () => setIsEditing(false)

  useEffect(() => {
    if (postData)
      store.dispatch(
        showPostApi.util.upsertQueryData('getPostData', postData?.items[0].id, postData)
      )
  }, [postData])

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
                    items={MyPostItems}
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
                    <>
                      <Comment
                        text={
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        }
                        title={'UrlProfile'}
                        image={user}
                      />
                      <Comment
                        text={
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        }
                        title={'UrlProfile'}
                        image={user}
                        like={false}
                      />
                      <Comment
                        text={
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        }
                        title={'UrlProfile'}
                        image={user}
                        like={true}
                      />
                      <Comment
                        text={
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        }
                        title={'UrlProfile'}
                        image={user}
                        like={false}
                      />
                    </>
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
