'use client'
import { ShowPost } from '@features/showPost/ui/ShowPost'
import React from 'react'

export type PostPageProps = {
  params: Promise<{
    id: string
  }>
}

export const PostPage = (props: PostPageProps) => {
  const { id } = React.use(props.params)

  return <ShowPost id={id} />
}
