import styles from './ProfileImages.module.scss'
import Image from 'next/image'
import { useGetMeQuery } from '@/shared/api/userApi'
import { useGetUserProfileQuery } from './api/profileApi'
import defaultImages from './images'

type File = {
  id: string
  url: string
}

type Post = {
  files: File[]
}

type ImageItem = {
  id: string
  url?: string
  img: string
}

export const ProfileImages = () => {
  const { data: meData } = useGetMeQuery()
  const userId = meData?.id

  const { data, isLoading } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })

  const imagesFromApi =
    data?.posts?.items
      .map((post: Post) => {
        const firstFile = post.files?.[0]
        return firstFile
          ? {
              id: firstFile.id,
              url: firstFile.url,
            }
          : null
      })
      .filter(Boolean) ?? []

  const imagesToShow = imagesFromApi.length > 0 ? imagesFromApi : defaultImages

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {imagesToShow.map((img: ImageItem) => (
          <Image
            key={img.id}
            src={img.url ?? img.img}
            alt={`Profile ${img.id}`}
            width={234}
            height={228}
            className={styles.image}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
