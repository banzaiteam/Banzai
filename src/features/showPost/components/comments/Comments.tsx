import React, { type ComponentPropsWithoutRef } from 'react'
import { Comment, type CommentPost } from '@/features'
import user from '@/assets/images/User.png'
import s from './Comments.module.scss'
import { Scroll } from '@shared/ui'
import clsx from 'clsx'

type Props = { comments: CommentPost[] } & ComponentPropsWithoutRef<'div'>

export const Comments = (props: Props) => {
  const { comments, children, className, ...rest } = props
  const styles = clsx(s.comments, className)
  const commentsMapped = comments?.map(({ text, likes, userId, id }) => {
    const { like, image, title } = { title: 'userName', image: user, like: false }
    return (
      <Comment
        key={id}
        userId={userId}
        text={text}
        title={title}
        image={image}
        like={like}
        likes={likes}
      />
    )
  })

  return (
    <Scroll className={s.scroll} aria-label="Post comments">
      <div className={styles} {...rest}>
        {children && children}
        {commentsMapped}
      </div>
    </Scroll>
  )
}
