'use client'
import { Button, Card } from '@/shared/ui'
import styles from './AddPost.module.scss'
import { HeaderCard } from './components/header-card/HeaderCard'
import { ImageDropzone } from './components/imageDrobzone/ImageDropzone'
import { useEffect, useState } from 'react'
import { FileRejection } from 'react-dropzone'

type AddPostProps = {
  title?: string
  buttonText?: string
  isOpenDraft?: boolean
}

export const AddPost = ({
  title = 'Add Photo',
  buttonText = 'Select from Computer',
  isOpenDraft = true,
}: AddPostProps) => {
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
      {files.length === 0 ? (
        <Card className={styles.modal}>
          <HeaderCard title={title} />
          <div className={styles.content}>
            <ImageDropzone onDrop={handleDrop} error={error} />
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
            </div>
          </div>
        </Card>
      ) : (
        <div>Preview and post creation UI</div>
      )}
    </div>
  )
}
