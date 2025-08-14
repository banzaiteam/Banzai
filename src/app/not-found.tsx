import { ROUTES } from '@/shared/constants/routes'
import styles from './not-found.module.scss'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.number}>404</p>
        <p className={styles.text}>Sorry, we were unable to find that page</p>
        <p className={styles.nav}>
          Start from
          <Link className={styles.link} href={ROUTES.home}>
            home page
          </Link>
        </p>
      </div>
    </main>
  )
}
