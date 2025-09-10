import s from './LastPostsItem.module.scss'
import { CircleImage, ShowMoreText, SwiperImages } from '@shared/ui'
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, useState } from 'react'
import Image from 'next/image'
import picture from '../../../../../../../public/picture.png'
import { z } from 'zod'
import { postDataSchema } from '@/features'
import { extractPropertyValues } from '@shared/utils/getArrayStrings'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> &
  Omit<z.infer<typeof postDataSchema>, 'isPublished' | 'userId' | 'updatedAt' | 'comments'>

export const LastPostsItem = (props: Props) => {
  const { className, description, avatar, files, createdAt } = props
  const [isActive, setActive] = useState(false)
  const urlImages = extractPropertyValues(files, 'url')
  const styles = clsx(s.wrapper, { [s.active]: isActive }, className)

  const onClickHandler = () => {
    setActive(prev => !prev)
  }
  return (
    <div className={styles}>
      <div className={s.image_wrapper}>
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
        <ShowMoreText onClick={onClickHandler} description={description} maxLength={85} />
      </div>
    </div>
  )
}
