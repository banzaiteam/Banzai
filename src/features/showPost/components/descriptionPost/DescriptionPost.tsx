import React from 'react'
import s from '../../components/comment/Comment.module.scss'
import Link from 'next/link'
import { ROUTES } from '@shared/constants/routes'
import { CircleImage, Scroll, Typography } from '@shared/ui'
import Image, { type StaticImageData } from 'next/image'

type Props = {
  description: string
  userId: string
  title: string
  image: string | StaticImageData
}

export const DescriptionPost = (props: Props) => {
  const { description, userId, title, image } = props
  return (
    <div
      data-id="post-description"
      className={s.comment}
      aria-labelledby="description-title"
      aria-describedby="description-content"
    >
      <div className={s.body}>
        <div className={s.avatar_wrapper}>
          <Link
            href={ROUTES.profile(userId)}
            className={s.url}
            aria-label={`Профиль пользователя ${'userName'}`}
          >
            <CircleImage>
              <Image
                src={image}
                alt={`Аватар пользователя ${'userName'}`}
                width={36}
                height={36}
                aria-hidden="true"
              />
            </CircleImage>
          </Link>
        </div>
        <div className={s.comment_text}>
          <Scroll className={s.scroll} aria-label={'Текст описания'}>
            <Typography variant={'regular_text_14'} id="description-content">
              <Link
                href={ROUTES.profile(userId)}
                className={s.url}
                aria-label={`Профиль пользователя ${'userName'}`}
              >
                {title}
              </Link>{' '}
              {description}
            </Typography>
          </Scroll>
          <div className={s.comment_information}>
            <time aria-label={`Опубликовано ${'timeAgo'}`}>
              <Typography variant={'small_text'}>2 Hours ago</Typography>
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}
