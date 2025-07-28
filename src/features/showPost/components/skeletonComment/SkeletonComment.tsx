import React from 'react'
import s from '@features/showPost/ui/ShowPost.module.scss'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'

export const SkeletonComment = () => {
  return (
    <div className={s.comment}>
      <div className={s.section}>
        <div className={s.avatar_wrapper}>
          <SkeletonCircle />
        </div>
        <div className={s.comment_text}>
          <div
            style={{
              display: 'flex',
              rowGap: '15px',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', columnGap: '15px' }}>
              <Skeleton width={'65px'} />
              <Skeleton />
            </div>

            <Skeleton />
            <Skeleton />
          </div>

          <div className={s.comment_information}>
            <span>
              <Skeleton width={'65px'} />
            </span>
            <span>
              <Skeleton width={'65px'} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
