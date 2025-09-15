'use client'
import s from './LastPosts.module.scss'
import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { z } from 'zod'
import { postDataSchema } from '@/features'
import { LastPostsItem } from '@features/lastPosts/ui/lastPostsItem/LastPostsItem'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  initialPostsData: z.infer<typeof postDataSchema>[]
}

export const LastPosts = (props: Props) => {
  const { className, initialPostsData } = props

  const styles = clsx(s.wrapper, className)

  const initialPostsDataMapped = initialPostsData.map(
    ({ id, createdAt, description, files, avatar, userId }) => (
      <LastPostsItem
        id={id}
        userId={userId}
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
