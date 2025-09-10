'use client'
import s from './LastPosts.module.scss'
import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { LastPostsItem } from '@/app/pages/homePage/components/lastPosts/lastPostsItem/LastPostsItem'
import { z } from 'zod'
import { postDataSchema } from '@/features'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  initialPostsData: z.infer<typeof postDataSchema>[]
}

export const LastPosts = (props: Props) => {
  const { className, initialPostsData } = props
  console.log(initialPostsData)
  const styles = clsx(s.wrapper, className)

  const initialPostsDataMapped = initialPostsData.map(
    ({ id, createdAt, description, files, avatar }) => (
      <LastPostsItem
        id={id}
        createdAt={createdAt}
        key={id}
        description={description}
        files={files}
        avatar={avatar}
      />
    )
  )

  return <div className={styles}>{initialPostsDataMapped}</div>
}
