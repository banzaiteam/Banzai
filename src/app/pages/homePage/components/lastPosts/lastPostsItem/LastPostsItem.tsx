import s from './LastPostsItem.module.scss'
import { CircleImage, ShowMoreText, SwiperImages } from '@shared/ui'
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, useState } from 'react'
import Image from 'next/image'
import picture from '../../../../../../../public/picture.png'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  text: string
}

export const LastPostsItem = (props: Props) => {
  const { className, text } = props
  const [isActive, setActive] = useState(false)
  const styles = clsx(s.wrapper, className)

  const onClickHandler = () => {
    setActive(prev => !prev)
  }
  return (
    <div className={styles}>
      <div className={clsx(s.image_wrapper, { [s.active]: isActive })}>
        <SwiperImages images={[picture, picture]} size={'small'} />
      </div>
      <div className={s.user_info}>
        <CircleImage size={'size-36'}>
          <Image className={s.image} src={picture} alt={'picture'} />
        </CircleImage>
        <span>UserName</span>
      </div>
      <div className={s.date}>22 min ago</div>
      <div className={s.text_body}>
        <ShowMoreText onClick={onClickHandler} text={text} maxLength={90} />
      </div>
    </div>
  )
}
