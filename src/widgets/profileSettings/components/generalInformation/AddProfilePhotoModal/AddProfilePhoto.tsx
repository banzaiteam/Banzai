'use client'
import { Button, Card } from '@/shared/ui'
import styles from './AddProfilePhoto.module.scss'
import { useState } from 'react'
import { HeaderCard } from '@features/createPost/components/header-card/HeaderCard'
import { ImageDropzone } from '@features/createPost/components/imageDrobzone/ImageDropzone'

type AddProfilePhotoProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (file: File) => void
}

export const AddProfilePhoto = ({ isOpen, onClose, onSave }: AddProfilePhotoProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setError(undefined)
  }

  const handleSave = () => {
    if (!files.length) return
    onSave(files[0])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.container}>
      <Card className={styles.modal}>
        <HeaderCard title="Upload Avatar" onClose={onClose} />
        <div className={styles.content}>
          <ImageDropzone onDrop={handleDrop} files={files} error={error} />
          <div className={styles.containerButton}>
            <Button
              variant="primary"
              onClick={() => document.getElementById('hidden-file-input')?.click()}
            >
              Select from Computer
            </Button>
            <Button variant="primary" disabled={!files.length} onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
