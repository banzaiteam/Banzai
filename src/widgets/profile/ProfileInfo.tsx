import styles from './ProfileInfo.module.scss'
import elon from '../../assets/profile/ellon.png'
import Image from 'next/image'
import Link from 'next/link'

export const ProfileInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Image src={elon} alt="Elon Musk" className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.top}>
            <h3 className={styles.username}>Elon Musk</h3>
            <Link className={styles.linkButton} href="#">
              <button className={styles.btn}>Profile Settings</button>
            </Link>
          </div>
          <div className={styles.stats}>
            <ul className={styles.items}>
              <li className={styles.item}>
                <span className={styles.accent}>1</span> Following
              </li>
              <li className={styles.item}>
                <span className={styles.accent}>255 M</span> Followers
              </li>
              <li className={styles.item}>
                <span className={styles.accent}>502</span> Publications
              </li>
            </ul>
          </div>
          <div className={styles.bio}>
            <p className={styles.text}>
              CEO and product architect of Tesla · Founder, CEO, and chief engineer of SpaceX ·
              Founder and CEO of xAI · Founder of the Boring Company and X Corp, Co-founder of
              PayPal · Grok AI Powered Chatbot {''}
              <a href="https://x.com/elonmusk" target="_blank" className={styles.link}>
                Learn more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
