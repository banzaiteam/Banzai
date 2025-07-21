import React from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import styles from './ImageDropzone.module.scss'
import { ImageOutline } from '@/assets/icons/components'
import { Alert } from '@/shared/ui'

type ImageDropzoneProps = {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void
  error?: string
}

export const ImageDropzone = ({ onDrop, error }: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
    multiple: false,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <div className={styles.container}>
      {error && <Alert status="error" message={error} />}
      <div className={styles.containerDropzone}>
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          <ImageOutline width={48} height={48} />
        </div>
      </div>
    </div>
  )
}
