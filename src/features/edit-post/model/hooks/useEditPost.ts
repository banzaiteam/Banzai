import { useEffect, useState } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import { useGetPostDataQuery } from '@features/showPost/api/api'
import { useEditPostMutation } from '@features/edit-post/api/editPostApi'
import { EditPostForm } from '@features/edit-post/ui/EditPostForm'

type UseEditPostData = Omit<EditPostForm, 'open'>

export const useEditPost = ({ postId, onClose }: UseEditPostData) => {
  const [description, setDescription] = useState('')
  const [originalDescription, setOriginalDescription] = useState('')
  const [showCloseModal, setShowCloseModal] = useState(false)
  const maxChars = 500

  const { data: userData } = useGetMeQuery()
  const username = userData?.profile.username

  const { data: postData } = useGetPostDataQuery(postId)
  const urlImages = postData?.items?.[0]?.files.map(file => file.url)
  useEffect(() => {
    const desc = postData?.items?.[0]?.description || ''
    setDescription(desc)
    setOriginalDescription(desc)
  }, [postData])

  const hasChanges = description !== originalDescription
  const handleRequestClose = () => {
    if (hasChanges) {
      setShowCloseModal(true)
    } else {
      onClose(false)
    }
  }

  const [editPost, { isLoading }] = useEditPostMutation()
  const buttonHandler = async () => {
    try {
      await editPost({ id: postId, description }).unwrap()
      onClose(false)
    } catch (error) {
      console.error('Ошибка при редактировании поста:', error)
    }
  }

  return {
    description,
    setDescription,
    originalDescription,
    showCloseModal,
    setShowCloseModal,
    maxChars,
    username,
    urlImages,
    isLoading,
    handleRequestClose,
    buttonHandler,
  }
}
