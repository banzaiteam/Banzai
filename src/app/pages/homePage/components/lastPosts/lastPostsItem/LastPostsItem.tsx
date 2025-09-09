import s from './LastPostsItem.module.scss'
import { CircleImage, ShowMoreText, SwiperImages } from '@shared/ui'
import clsx from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import picture from '../../../../../../../public/picture.png'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  text: string
}

export const LastPostsItem = (props: Props) => {
  const { className, text } = props
  const styles = clsx(s.wrapper, className)

  return (
    <div className={styles}>
      <div className={s.image_wrapper}>
        <SwiperImages images={[picture, picture]} size={'small'} />
      </div>
      <div className={s.user_info}>
        <CircleImage size={'size-36'}>
          <Image className={s.image} src={picture} alt={'picture'} />
        </CircleImage>
        <span>UserName</span>
      </div>
      <div className={s.date}>22 min ago</div>

      <ShowMoreText className={s.text_body} text={text} maxLength={90} />
    </div>
  )
}
