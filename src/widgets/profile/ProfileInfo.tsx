import styles from './ProfileInfo.module.scss'
import elon from '../../assets/profile/ellon.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useGetMeQuery } from '@/shared/api/userApi'
import { useGetUserProfileQuery } from './api/profileApi'
import { Button } from '@/shared/ui'

export const ProfileInfo = () => {
  const { data: meData, isLoading: meIsLoading } = useGetMeQuery()
  const { data: profileData, isLoading: profileIsLoading } = useGetUserProfileQuery(
    meData?.id as string,
    {
      skip: !meData?.id,
    }
  )

  const username = profileData?.user?.username || 'Elon   Musk'
  const avatar = profileData?.user?.url || elon
  const following = profileData?.user?.stats?.following || '1'
  const followers = profileData?.user?.stats?.followers || '255 M'
  const publications = profileData?.user?.stats?.posts || '502'
  const about =
    meData?.profile?.aboutMe ||
    `CEO and product architect of Tesla · Founder, CEO, and chief engineer of SpaceX · 
   Founder and CEO of xAI · Founder of the Boring Company and X Corp, Co-founder of 
   PayPal · Grok AI Powered Chatbot`

  const bio = about.length > 230 ? about.slice(0, 228) + '...' : about

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Image src={avatar} alt={username} className={styles.avatar} width={204} height={204} />
        <div className={styles.info}>
          <div className={styles.top}>
            <h3 className={styles.username}>{username}</h3>
            <Link className={styles.linkButton} href="#">
              <Button className={styles.btn}>Profile Settings</Button>
            </Link>
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
    </div>
  )
}
