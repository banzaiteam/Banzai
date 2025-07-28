import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import { useGetMeQuery } from '@/shared/api/userApi'
import { useGetUserProfileQuery } from './api/profileApi'
import { ROUTES } from '@/shared/constants/routes'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProfileImages.module.scss'

type Post = {
  id: string
  files: File[]
}

type File = {
  id: string
  url: string
}

export const ProfileImages = () => {
  const { data: meData } = useGetMeQuery()
  const userId = meData?.id
  console.log('me', userId)

  const [page, setPage] = useState(1)
  const limit = 12

  const { data, isLoading, isFetching } = useGetUserProfileQuery(
    { id: userId!, page, limit },
    { skip: !userId }
  )

  const [allPosts, setAllPosts] = useState<Post[]>([])

  const fetchMore = () => setPage(prev => prev + 1)

  useEffect(() => {
    if (data?.posts?.items?.length) {
      setAllPosts(prev => [...prev, ...data.posts.items])
    }
  }, [data])

  return (
    <div className={styles.container}>
      <InfiniteScroll
        hasMore={data?.posts?.totalItems > allPosts.length}
        next={fetchMore}
        dataLength={allPosts.length}
        loader={<p>Loading more...</p>}
      >
        <div className={styles.grid}>
          {allPosts.map((post: Post) => {
            const file = post.files?.[0]
            if (!file) return null

            return (
              <Link key={file.id} href={ROUTES.post(post.id)}>
                <Image
                  src={file.url}
                  alt={`Post ${post.id}`}
                  width={234}
                  height={228}
                  className={styles.image}
                  loading="lazy"
                />
              </Link>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}
