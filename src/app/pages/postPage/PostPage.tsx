import { ShowPost } from '@features/showPost/ui/ShowPost'
import React from 'react'

export type PostPageProps = {
  params: Promise<{
    id: string
  }>
}

export const PostPage = async ({ params }: PostPageProps) => {
  const postId = (await params).id

  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?filter=id:eq:${postId}`
  ).then(res => res.json())

  return <ShowPost postData={postData} id={postId} />
}
