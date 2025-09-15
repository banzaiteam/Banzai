import s from './LastPostsItem.module.scss'
import { CircleImage, ShowMoreText, SwiperImages } from '@shared/ui'
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, useState } from 'react'
import Image from 'next/image'
import picture from '../../../../../public/picture.png'
import { z } from 'zod'
import { postDataSchema } from '@/features'
import { extractPropertyValues } from '@shared/utils/getArrayStrings'
import { usePostNavigation } from '@features/lastPosts/model/hooks/usePostNavigation'
import { motion } from 'framer-motion'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> &
  Omit<z.infer<typeof postDataSchema>, 'isPublished' | 'updatedAt' | 'comments'>

export const LastPostsItem = (props: Props) => {
  const { className, id, description, avatar, files, createdAt, userId } = props
  const [isActive, setActive] = useState(false)
  const urlImages = extractPropertyValues(files, 'url')
  const styles = clsx(s.wrapper, { [s.active]: isActive }, className)
  const { onClickPostHandler } = usePostNavigation()
  const onClickShowMoreHandler = () => {
    setActive(prev => !prev)
  }
  const onClickHandler = () => {
    onClickPostHandler(userId, id)
  }
  return (
    <motion.div
      className={styles}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className={s.image_wrapper} onClick={onClickHandler}>
        <SwiperImages images={urlImages} size={'small'} />
      </div>
      <div className={s.user_info}>
        <CircleImage size={'size-36'}>
          <Image
            width={36}
            height={36}
            className={s.image}
            src={avatar || picture}
            alt={'user avatar'}
          />
        </CircleImage>
        <span>UserName</span>
      </div>
      <div className={s.date}>{createdAt}</div>
      <div className={s.text_body}>
        <ShowMoreText onClick={onClickShowMoreHandler} description={description} maxLength={110} />
      </div>
    </motion.div>
  )
}
