import { PostPage } from '@/app/pages/postPage/PostPage'

type Props = {
  params: Promise<{
    id: string
  }>
}
export default async function PostModal({ params }: Props) {
  return <PostPage params={params} />
}
