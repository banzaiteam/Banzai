import { PostPage, type PostPageProps } from '@/app/pages/postPage/PostPage'

export default async function PostModal({ params }: PostPageProps) {
  return <PostPage params={params} />
}
