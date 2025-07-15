import styles from './ProfileImages.module.scss'
import Image from 'next/image'
import images from './images'

export const ProfileImages = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {images.map(item => (
          <Image
            key={item.id}
            src={item.img}
            alt={`Profile ${item.id}`}
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
