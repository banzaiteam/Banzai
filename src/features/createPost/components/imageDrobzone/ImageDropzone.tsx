import React, { useEffect } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import styles from './ImageDropzone.module.scss'
import { ImageOutline } from '@/assets/icons/components'
import { Alert } from '@/shared/ui'
import Image from 'next/image'

type ImageDropzoneProps = {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void
  error?: string
  files?: File[]
}

export const ImageDropzone = ({ onDrop, error, files }: ImageDropzoneProps) => {
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
  // Создаем URL для превью изображения
  const previewUrl = files && files[0] ? URL.createObjectURL(files[0]) : null

  // Очищаем объектный URL при размонтировании компонента
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className={styles.container}>
      {error && <Alert status="error" message={error} />}
      <div className={styles.containerDropzone}>
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} id="hidden-file-input" />
          {previewUrl ? (
            <Image src={previewUrl} alt={'user select image'} width={48} height={48} />
          ) : (
            <ImageOutline width={48} height={48} />
          )}
        </div>
      </div>
    </div>
  )
}
