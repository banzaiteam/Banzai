import { PostPage, type PostPageProps } from '@/app/pages'
import { ClientWrapper } from '@/app/[locale]/(with-header)/posts/[id]/WrapperPage'

export default function ShowPostPage({ params }: PostPageProps) {
  return (
    <ClientWrapper>
      <PostPage params={params} />
    </ClientWrapper>
  )
}
