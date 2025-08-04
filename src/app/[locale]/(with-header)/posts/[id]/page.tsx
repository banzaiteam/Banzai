import { type PostPageProps } from '@/app/pages/postPage/PostPage'
import { ShowPost } from '@features/showPost/ui/ShowPost'

export default async function ShowPostById({ params }: PostPageProps) {
  const postId = (await params).id
  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?filter=id:eq:${postId}`
  ).then(res => res.json())

  return <ShowPost postData={postData} />
}
