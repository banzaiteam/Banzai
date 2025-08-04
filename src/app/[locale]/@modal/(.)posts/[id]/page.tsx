import { PostPage, type PostPageProps } from '@/app/pages'

export default async function ShowPostPageModal({ params }: PostPageProps) {
  return <PostPage params={params} />
}
