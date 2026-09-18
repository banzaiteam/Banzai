'use client'
import { ArrowIosBackOutline, PinOutline } from '@/assets/icons/components'
import styles from './Publication.module.scss'
import { Button, Input, Textarea } from '@/shared/ui'
import Ellon from '../../assets/profile/ellon.jpg'
import Image from 'next/image'
import { usePublication } from '@widgets/Publication/model/hooks'
import Palm from '../../assets/images/Palm.png'
import { SsePhoto } from '@features/createPost/model/hooks'

export default function Publication({ photo }: { photo?: SsePhoto }) {
  const { onClickHandler, description, setDescription } = usePublication(photo)

  return (
    <div className={styles.publication}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <ArrowIosBackOutline className={styles.arrow} />
            <p className={styles.title}>Publication</p>
            <Button variant="text-button" onClick={onClickHandler}>
              Publish
            </Button>
          </div>
          <div className={styles.modal__inner}>
            <div className={styles.modal__img}>
              {photo ? (
                <img
                  src={photo.url}
                  alt={photo.fileName || 'Uploaded image'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Image src={Palm} alt="Palm" />
              )}
            </div>
            <div className={styles.post}>
              <div className={styles.user}>
                <Image className={styles.user__img} src={Ellon} alt="image" />
                <p className={styles.user__name}>Ellon Fucking Musk</p>
              </div>
              <div className={styles.descr}>
                <Textarea
                  className={styles.editor}
                  title="Add publication descriptions"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.location}>
                <label className={styles.label}>Add location</label>
                <div className={styles.wrapper}>
                  <Input className={styles.input} placeholder="New York" />
                  <PinOutline className={styles.icon} />
                </div>
              </div>
              <div className={styles.geo}>
                <p className={styles.city}>New York</p>
                <p className={styles.place}>Washington Square Park</p>
              </div>
              <div className={styles.geo}>
                <p className={styles.city}>New York</p>
                <p className={styles.place}>Washington Square Park</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
