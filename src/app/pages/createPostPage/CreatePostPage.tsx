import { CreatePost } from '@/features'
import { AuthBoundary } from '@shared/lib/hoc/authBoundary'

export const CreatePostPage = () => {
  return (
    <AuthBoundary access={'auth-only'}>
      <CreatePost />
    </AuthBoundary>
  )
}
