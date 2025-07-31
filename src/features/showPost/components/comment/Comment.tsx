import s from './Comment.module.scss'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import Image, { type StaticImageData } from 'next/image'
import { Typography } from '@shared/ui'
import Link from 'next/link'
import { Heart, HeartOutline } from '@/assets/icons/components'
import React from 'react'

type CommentProps = {
  title: string
  text: string
  image: string | StaticImageData
  like?: boolean
}

export const Comment = (props: CommentProps) => {
  const { like, title, text, image } = props
  return (
    <div className={s.comment}>
      <div className={s.section}>
        <div className={s.avatar_wrapper}>
          <CircleImage>
            <Image src={image} alt={'user'} width={36} height={36} />
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
            {like !== undefined && (
              <span>
                <Typography variant={'semi_bold_small_text'}>Answer</Typography>
              </span>
            )}
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
