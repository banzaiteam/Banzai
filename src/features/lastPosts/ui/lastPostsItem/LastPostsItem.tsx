import s from './LastPostsItem.module.scss'
import { CircleImage, ShowMoreText, SwiperImages } from '@shared/ui'
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, useRef, useState } from 'react'
import Image from 'next/image'
import picture from '../../../../../public/picture.png'
import { z } from 'zod'
import { postDataSchema } from '@/features'
import { extractPropertyValues } from '@shared/utils/getArrayStrings'
import { usePostNavigation } from '@features/lastPosts/model/hooks/usePostNavigation'
import { motion } from 'framer-motion'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> &
  Omit<z.infer<typeof postDataSchema>, 'isPublished' | 'updatedAt' | 'comments'> & {
    ariaPosInSet?: number
    ariaSetSize?: number
  }

export const LastPostsItem = (props: Props) => {
  const {
    className,
    id,
    description,
    avatar,
    files,
    createdAt,
    userId,
    ariaPosInSet,
    ariaSetSize,
  } = props
  const [isActive, setActive] = useState(false)
  const urlImages = extractPropertyValues(files, 'url')
  /**/
  const [isImageLoaded, setImageLoaded] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  /**/
  const styles = clsx(s.wrapper, { [s.active]: isActive }, className)
  const { onClickPostHandler } = usePostNavigation()
  const onClickShowMoreHandler = () => {
    setActive(prev => !prev)
  }
  const onClickHandler = () => {
    onClickPostHandler(userId, id)
  }
  return (
    <motion.article
      ref={articleRef}
      className={styles}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      role="listitem"
      aria-posinset={ariaPosInSet}
      aria-setsize={ariaSetSize}
      aria-labelledby={`post-title-${id}`}
      aria-describedby={`post-desc-${id} post-date-${id}`}
    >
      <div
        className={s.image_wrapper}
        onClick={onClickHandler}
        role="button"
        tabIndex={0}
        aria-label={`Посмотреть публикацию полностью. ${urlImages.length > 0 ? `Содержит ${urlImages.length} изображений` : ''}`}
      >
        <SwiperImages images={urlImages} size={'small'} />
      </div>
      <div className={s.user_info}>
        <CircleImage size={'size-36'}>
          <Image
            width={36}
            height={36}
            className={s.image}
            src={avatar || picture}
            alt={`Аватар пользователя`}
            onLoadingComplete={() => setImageLoaded(true)}
            aria-hidden={!isImageLoaded}
          />
        </CircleImage>
        <span aria-hidden="true">UserName</span>
      </div>
      <time className={s.date} dateTime={new Date(createdAt).toISOString()} id={`post-date-${id}`}>
        {createdAt}
      </time>
      <div className={s.text_body} id={`post-desc-${id}`}>
        <ShowMoreText
          onClick={onClickShowMoreHandler}
          description={description}
          maxLength={110}
          aria-controls={`post-desc-${id}`}
          button-label={isActive ? 'Свернуть текст' : 'Развернуть текст'}
        />
      </div>
    </motion.article>
  )
}
