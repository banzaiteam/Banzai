import React, { useState } from 'react'
import { Button, Popup, Typography } from '@shared/ui'
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog'
import {
  BookmarkOutline,
  Close,
  Heart,
  HeartOutline,
  PaperPlaneOutline,
} from '@/assets/icons/components'
import s from './ShowPost.module.scss'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image, { type StaticImageData } from 'next/image'
import user from '@/assets/images/User.png'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import Link from 'next/link'
import Palm from '@/assets/images/Palm.png'

type ShowPostProps = {
  open: boolean
  onClose: (value: boolean) => void
}
type CommentProps = {
  title: string
  text: string
  image: string | StaticImageData
  like?: boolean
}

export const ShowPost = (props: ShowPostProps) => {
  const { onClose, ...rest } = props
  const [inputValue, setInputValue] = useState('')
  const onCloseHandler = () => onClose(false)

  return (
    <Popup {...rest} onOpenChange={onClose} size={'xl'}>
      <DialogClose className={s.close} onClick={onCloseHandler}>
        <Close />
      </DialogClose>
      <VisuallyHidden asChild>
        <DialogTitle className={s.hidden_title}>show post</DialogTitle>
      </VisuallyHidden>

      <div className={s.wrapper}>
        <div className={s.image_wrapper}>
          <Image src={Palm} alt={'main-image post'} />
        </div>
        <div className={s.comments_block}>
          <div className={s.header}>
            <div className={s.user}>
              <CircleImage>
                <Image src={user} alt={'user'} />
              </CircleImage>
              <Typography variant={'h3'}>URLProfiele</Typography>
            </div>
            <button type={'button'}>* * *</button>
          </div>
          <div className={s.comments}>
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
          </div>
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
                <CircleImage size={'size-24'}>
                  <Image src={user} alt={'user'} />
                </CircleImage>
                <CircleImage size={'size-24'}>
                  <Image src={user} alt={'user'} />
                </CircleImage>
                <CircleImage size={'size-24'}>
                  <Image src={user} alt={'user'} />
                </CircleImage>
              </div>
              <span>
                <Typography variant={'regular_text_14'} as={'span'}>
                  <span>2 243 </span>
                </Typography>
                <Typography variant={'bold_text_14'} as={'span'}>
                  <span>&quot;Like&quot;</span>
                </Typography>
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
              />
              <Button variant={'text-button'} type={'button'}>
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

const Comment = (props: CommentProps) => {
  const { like, title, text, image } = props
  return (
    <div className={s.comment}>
      <div className={s.section}>
        <div className={s.avatar_wrapper}>
          <CircleImage>
            <Image src={image} alt={'user'} />
          </CircleImage>
        </div>
        <div className={s.comment_text}>
          <Typography variant={'regular_text_14'}>
            <Link href={title} className={s.url}>
              UrlProfile{' '}
            </Link>
            {text}
          </Typography>
          <div className={s.comment_information}>
            <span>
              <Typography variant={'small_text'}>2 Hours ago</Typography>
            </span>
            {like && (
              <span>
                <Typography variant={'semi_bold_small_text'}>Like: 1</Typography>
              </span>
            )}
            <span>
              <Typography variant={'semi_bold_small_text'}>Answer</Typography>
            </span>
          </div>
        </div>
      </div>
      {like !== undefined && (
        <div className={s.heart_wrapper}>
          {!like && (
            <button type={'button'}>
              <HeartOutline height={20} width={20} viewBox={'0 0 24 24'} />
            </button>
          )}
          {like && (
            <button type={'button'}>
              <Heart className={s.heart} height={20} width={20} viewBox={'0 0 24 24'} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
