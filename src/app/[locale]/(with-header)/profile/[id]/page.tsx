import Image from 'next/image'
import styles from './Profile.module.scss'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants/routes'

type File = {
  id: string
  url: string
}

type Post = {
  id: string
  files?: File[]
}

type PostsData = {
  items: Post[]
}

export default async function ProfileID({ params }: { params: { id: string } }) {
  const { id } = await params // params is a promise and you need to await it if your page component is async

  const res = await fetch(`https://gate.yogram.ru/api/v1/users/${id}/profile`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch profile')
  }

  const data = await res.json()
  const user = data.user
  const posts: PostsData = data.posts

  const username = user?.username
  const avatar = user?.url
  const following = user?.stats?.following || '1'
  const followers = user?.stats?.followers || '255 M'
  const publications = user?.stats?.posts || '502'
  const bio = user?.profile?.aboutMe

  return (
    <main className={styles.profile__main}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {avatar && (
            <Image src={avatar} alt="picture" className={styles.avatar} width={204} height={204} />
          )}
          <div className={styles.info}>
            <div className={styles.top}>
              <h3 className={styles.username}>{username}</h3>
            </div>
            <div className={styles.stats}>
              <ul className={styles.items}>
                <li className={styles.item}>
                  <span className={styles.accent}>{following}</span> Following
                </li>
                <li className={styles.item}>
                  <span className={styles.accent}>{followers}</span> Followers
                </li>
                <li className={styles.item}>
                  <span className={styles.accent}>{publications}</span> Publications
                </li>
              </ul>
            </div>
            <div className={styles.bio}>
              <p className={styles.text}>{bio}</p>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {posts.items.map(post => {
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
      </div>
    </main>
  )
}
