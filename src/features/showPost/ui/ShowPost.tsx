'use client'
import React, { useState } from 'react'
import { Button, Popup, Scroll, Typography } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import {
  BookmarkOutline,
  Close,
  Edit2Outline,
  HeartOutline,
  ImageOutline,
  PaperPlaneOutline,
  TrashOutline,
} from '@/assets/icons/components'
import s from './ShowPost.module.scss'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import user from '@/assets/images/User.png'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import { MeatballsMenu } from '@widgets/meatballsMenu/ui/MeatballsMenu'
import { VerifyModal } from '@features/showPost/components/verifyModal/VerifyModal'
import type { MeatballsMenuItemData } from '@/widgets'
import { useGetPostDataQuery } from '@features/showPost/api/api'
import { useRouter } from '@/i18n/navigation'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { SkeletonComment } from '@features/showPost/components/skeletonComment/SkeletonComment'
import { Comment } from '@/features'

type ShowPostProps = {
  open?: boolean
  onClose?: (value: boolean) => void
  id: string
}

export const ShowPost = (props: ShowPostProps) => {
  const { onClose, id, ...rest } = props
  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const [isOpenVerifyDeleteModal, setOpenVerifyDeleteModal] = useState(false)
  const [isOpenMeatballsMenu, setOpenMeatballsMenu] = useState(false)
  const { data, isFetching } = useGetPostDataQuery(id)
  const urlImage = data?.items[0].files[0].url
  const MyPostItems: MeatballsMenuItemData[] = [
    {
      title: 'Edit Post',
      icon: <Edit2Outline />,
      onClick: () => {},
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
  return (
    <>
      <Popup open={true} {...rest} onOpenChange={onCloseHandler} size={'xl'}>
        <DialogClose className={s.close} onClick={onClickHandler}>
          <Close />
        </DialogClose>
        <VisuallyHidden asChild>
          <DialogTitle className={s.hidden_title}>show post</DialogTitle>
        </VisuallyHidden>
        <Scroll>
          <div className={s.wrapper}>
            <div className={s.image_wrapper}>
              {isFetching ? (
                <Skeleton className={s.skeleton_main_image} />
              ) : urlImage ? (
                <Image src={urlImage} width={485} height={562} alt={'main-image post'} />
              ) : (
                <ImageOutline
                  className={s.io}
                  viewBox={'0 0 24 24'}
                  width={'150px'}
                  height={'150px'}
                />
              )}
            </div>

            <div className={s.comments_block}>
              <div className={s.header}>
                <div className={s.user}>
                  {isFetching ? (
                    <SkeletonCircle size={36} />
                  ) : (
                    <CircleImage>
                      <Image src={user} alt={'user'} width={36} height={36} />
                    </CircleImage>
                  )}

                  {isFetching ? (
                    <Skeleton width={'100px'} />
                  ) : (
                    <Typography variant={'h3'}>UserName</Typography>
                  )}
                </div>
                <MeatballsMenu
                  items={MyPostItems}
                  isOpen={isOpenMeatballsMenu}
                  toggleOpen={setOpenMeatballsMenu}
                  disabled={isFetching}
                />
              </div>
              <Scroll className={s.scroll}>
                <div className={s.comments}>
                  {isFetching ? (
                    <>
                      <SkeletonComment />
                      <SkeletonComment />
                    </>
                  ) : (
                    <>
                      {' '}
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
                      />{' '}
                    </>
                  )}
                </div>
              </Scroll>
              <div className={s.engagement_info}>
                <div className={s.icons_wrapper}>
                  <div className={s.icons_group}>
                    <button type={'button'}>
                      <HeartOutline />
                    </button>
                    <button type={'button'}>
                      <PaperPlaneOutline />
                    </button>
                  </div>
                  <div className={s.icons_group}>
                    <button type={'button'}>
                      <BookmarkOutline />
                    </button>
                  </div>
                </div>
                <div className={s.social_activity}>
                  <div className={s.last_likes}>
                    {isFetching ? (
                      <>
                        <SkeletonCircle size={24} />
                        <SkeletonCircle size={24} />
                        <SkeletonCircle size={24} />
                      </>
                    ) : (
                      <>
                        <CircleImage size={'size-24'}>
                          <Image src={user} alt={'user'} />
                        </CircleImage>
                        <CircleImage size={'size-24'}>
                          <Image src={user} alt={'user'} />
                        </CircleImage>
                        <CircleImage size={'size-24'}>
                          <Image src={user} alt={'user'} />
                        </CircleImage>
                      </>
                    )}
                  </div>
                  <span>
                    {isFetching ? (
                      <Skeleton width={'100px'} />
                    ) : (
                      <>
                        <Typography variant={'regular_text_14'} as={'span'}>
                          <span>2 243 </span>
                        </Typography>
                        <Typography variant={'bold_text_14'} as={'span'}>
                          <span>&quot;Like&quot;</span>
                        </Typography>
                      </>
                    )}
                  </span>
                </div>
                <Typography variant={'small_text'} className={s.date}>
                  July 3, 2021
                </Typography>
              </div>
              <div className={s.add_comment}>
                <div className={s.add_comment_wrapper}>
                  <input
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.currentTarget.value)
                    }}
                    type="text"
                    placeholder={'Add a Comment...'}
                    disabled={isFetching}
                  />

                  <Button disabled={isFetching} variant={'text-button'} type={'button'}>
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </Popup>

      <VerifyModal
        title={'Delete Post'}
        isOpenValue={isOpenVerifyDeleteModal}
        onClose={setOpenVerifyDeleteModal}
      >
        <Typography variant={'regular_text_16'} className={s.verify_text}>
          Are you sure you want to delete this post?
        </Typography>
      </VerifyModal>
    </>
  )
}
