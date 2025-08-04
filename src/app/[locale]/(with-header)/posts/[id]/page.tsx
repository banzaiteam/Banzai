import { PostPage, type PostPageProps } from '@/app/pages'

export default async function ShowPostPage({ params }: PostPageProps) {
  return <PostPage params={params} />
}
