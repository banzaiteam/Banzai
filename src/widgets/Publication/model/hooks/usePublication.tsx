import { useRouter } from 'next/navigation'
import { ROUTES } from '@shared/constants/routes'
import { useGetMeQuery } from '@shared/api/userApi'
import { usePublishPostMutation } from '@widgets/Publication/api/publicationApi'
import { SsePhoto } from '@features/createPost/model/hooks'
import { useState } from 'react'

export const usePublication = (photo?: SsePhoto) => {
  const router = useRouter()
  const { data: meData } = useGetMeQuery()
  const [publishPost] = usePublishPostMutation()
  const [description, setDescription] = useState('')

  const onClickHandler = async () => {
    if (photo?.postId) {
      try {
        await publishPost({
          postId: photo.postId,
          description: description.trim() || undefined,
        }).unwrap()
      } catch (error) {
        console.error('Failed to publish post:', error)
      }
    }
    router.push(ROUTES.profile(meData?.id as string))
  }

  return {
    onClickHandler,
    description,
    setDescription,
  }
}
