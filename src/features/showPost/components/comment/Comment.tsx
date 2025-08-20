import s from './Comment.module.scss'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import Image, { type StaticImageData } from 'next/image'
import { Scroll, Typography } from '@shared/ui'
import Link from 'next/link'
import { Heart, HeartOutline } from '@/assets/icons/components'
import React from 'react'
import { AnswerButton } from '@features/showPost/components/answerButton/AnswerButton'
import { ROUTES } from '@shared/constants/routes'

export type CommentProps = {
  title: string
  text: string
  image: string | StaticImageData
  like?: boolean
  likes: null | number /*fixik Nullable*/
  userId: string
}
/*TODO ДОДЕЛАТЬ a8y*/
export const Comment = (props: CommentProps) => {
  const { like, title, text, likes, image, userId } = props
  const onClickLikeHandler = () => {
    alert('like')
  }
  const onClickAnswerHandler = () => {
    alert('answer')
  }
  return (
    <div
      data-id="post-comment-item"
      className={s.comment}
      aria-labelledby="comment-title"
      aria-describedby="comment-content"
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
          <Scroll className={s.scroll} aria-label={'Текст комментария'}>
            <Typography variant={'regular_text_14'} id="comment-content">
              <Link
                href={ROUTES.profile(userId)}
                className={s.url}
                aria-label={`Профиль пользователя ${'userName'}`}
              >
                {title}
              </Link>{' '}
              {text}
            </Typography>
          </Scroll>
          <div className={s.comment_information}>
            <time aria-label={`Опубликовано ${'timeAgo'}`}>
              <Typography variant={'small_text'}>2 Hours ago</Typography>
            </time>
            {!!likes && (
              <span aria-label={`Количество лайков: ${likes}`}>
                <Typography variant={'semi_bold_small_text'}>Like: {likes}</Typography>
              </span>
            )}
            {<AnswerButton onClick={onClickAnswerHandler} />}
          </div>
        </div>
      </div>

      <div className={s.heart_wrapper}>
        {like ? (
          <button type={'button'} aria-label="Убрать лайк">
            <Heart
              className={s.heart}
              height={20}
              width={20}
              viewBox={'0 0 24 24'}
              aria-hidden="true"
              onClick={onClickLikeHandler}
            />
          </button>
        ) : (
          <button type={'button'} aria-label="Поставить лайк">
            <HeartOutline
              height={20}
              width={20}
              viewBox={'0 0 24 24'}
              aria-hidden="true"
              onClick={onClickLikeHandler}
            />
          </button>
        )}
      </div>
    </div>
  )
}
