'use client'
import s from './LastPosts.module.scss'
import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { LastPostsItem } from '@/app/pages/homePage/components/lastPosts/lastPostsItem/LastPostsItem'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const LastPosts = (props: Props) => {
  const { className } = props

  const styles = clsx(s.wrapper, className)

  return (
    <div className={styles}>
      <LastPostsItem
        text={
          'loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Alias  repudiandae.' +
          'loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid corporis, cumque eligendi numquam odio praesentium? A adipisci aliquid corporis, cumque eligendi numquam odio praesentium? A adipisci animi aspernatur esse ex, itaque laborum magnam, non, optio quia quod repudiandae.'
        }
      />
      <LastPostsItem
        text={
          'loremLorem ipsum dolor sit amet, consectetur praesentium? A adipisci animi aspernatur esse ex, itaque laborum magnam, non, optio quia quod repudiandae.'
        }
      />
      <LastPostsItem
        text={'loremLorem ipsum dolor sit amet, consectetur non, optio quia quod repudiandae.'}
      />
      <LastPostsItem text={'loremLorem .'} />
    </div>
  )
}
