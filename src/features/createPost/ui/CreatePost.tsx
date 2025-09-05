'use client'
import { Button, Card } from '@/shared/ui'
import styles from './CreatePost.module.scss'
import { HeaderCard } from '../components/header-card/HeaderCard'
import { ImageDropzone } from '../components/imageDrobzone/ImageDropzone'
import { useEffect, useState } from 'react'
import { FileRejection } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { useCreatePostMutation } from '@features/createPost/api/api'
import { ROUTES } from '@shared/constants/routes'

type CreatePostProps = {
  title?: string
  buttonText?: string
  isOpenDraft?: boolean
  onClose?: () => void
}

export const CreatePost = ({
  title = 'Add Photo',
  buttonText = 'Select from Computer',
  isOpenDraft = true,
  onClose,
}: CreatePostProps) => {
  const router = useRouter()
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
  useEffect(() => {
    console.log(files)
  }, [files])
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
      router.push(ROUTES.home)
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

  return (
    <div className={styles.container}>
      <Card className={styles.modal}>
        <HeaderCard title={title} onClose={handleClose} />
        <div className={styles.content}>
          <ImageDropzone onDrop={handleDrop} files={files} error={error} />
          <div className={styles.containerButton}>
            <Button
              variant="primary"
              width={isDesktop ? '219px' : '300px'}
              minHeight={isDesktop ? '36px' : '48px'}
              onClick={() => document.getElementById('hidden-file-input')?.click()}
            >
              {buttonText}
            </Button>
            {isOpenDraft && (
              <Button
                variant="outline"
                width={isDesktop ? '219px' : '300px'}
                minHeight={isDesktop ? '36px' : '48px'}
              >
                Open Draft
              </Button>
            )}
            <Button
              disabled={!files.length || isLoading}
              variant="primary"
              aria-label={'Create Post'}
              width={isDesktop ? '219px' : '300px'}
              minHeight={isDesktop ? '36px' : '48px'}
              onClick={onClickHandler}
            >
              Create Post
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
