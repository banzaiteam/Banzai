import { PostPage, type PostPageProps } from '@/app/pages'
import { WrapperPage } from './WrapperPage'

export default function ShowPostPage({ params }: PostPageProps) {
  return (
    <WrapperPage>
      <PostPage params={params} />
    </WrapperPage>
  )
}
