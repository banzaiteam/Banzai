'use client'
import { Button, Card } from '@/shared/ui'
import styles from './CreatePost.module.scss'
import { HeaderCard } from '../components/header-card/HeaderCard'
import { ImageDropzone } from '../components/imageDrobzone/ImageDropzone'
import { useCreatePost } from '@features/createPost/model/hooks'
import Publication from '@widgets/Publication/Publication'

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
  const {
    files,
    error,
    isDesktop,
    isLoading,
    isModalOpen,
    photo,
    handleDrop,
    handleClose,
    onClickHandler,
  } = useCreatePost(onClose)
  return (
    <>
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
      {isModalOpen && photo && <Publication photo={photo} />}
    </>
  )
}
