import { ShowPost } from '@features/showPost/ui/ShowPost'
import React from 'react'

export type PostPageProps = {
  params: Promise<{
    id: string
  }>
}

export const PostPage = async ({ params }: PostPageProps) => {
  const postId = (await params).id

  const initialPostData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?filter=id:eq:${postId}`
  ).then(res => res.json())
  const initialFindOneUserData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/findone?id=${initialPostData.items[0].userId}`
  ).then(res => res.json())

  return (
    <ShowPost
      initialFindOneUserData={initialFindOneUserData}
      initialPostData={initialPostData}
      id={postId}
    />
  )
}
