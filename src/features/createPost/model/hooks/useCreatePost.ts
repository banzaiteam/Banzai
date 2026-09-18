import { useRouter } from 'next/navigation'
import { useCreatePostMutation } from '@features/createPost/api/api'
import { useEffect, useState } from 'react'
import { FileRejection } from 'react-dropzone'
import { useSsePhotos } from '@features/createPost/model/hooks/useSsePhotos'

export const useCreatePost = (onClose?: () => void) => {
  const router = useRouter()
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')
  const [isDesktop, setIsDesktop] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { photo } = useSsePhotos()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {}, [files])
  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      router.push('/') // редирект на главную
    }
  }

  const onClickHandler = async () => {
    try {
      await createPost({ files })
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError('')

    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0]
      setError(
        error.code === 'file-too-large'
          ? 'Error! Photo size must be less than 20 MB!'
          : 'Error! The format of the uploaded photo must be PNG and JPEG'
      )
      return
    }

    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles)
    }
  }

  return {
    files,
    error,
    isDesktop,
    isLoading,
    isModalOpen,
    photo,
    handleDrop,
    handleClose,
    onClickHandler,
  }
}
