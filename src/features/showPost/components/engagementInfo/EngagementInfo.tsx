import React, { type ComponentPropsWithoutRef } from 'react'
import s from '@features/showPost/ui/ShowPost.module.scss'
import { BookmarkOutline, HeartOutline, PaperPlaneOutline } from '@/assets/icons/components'
import { Skeleton, SkeletonCircle } from '@shared/ui/skeleton/Skeleton'
import { CircleImage } from '@shared/ui/circleImage/ui/CircleImage'
import Image from 'next/image'
import user from '@/assets/images/User.png'
import { Typography } from '@shared/ui'
import { useGetPostDataQuery } from '@features/showPost/api/api'

type Props = {
  postId: string
} & ComponentPropsWithoutRef<'div'>

export const EngagementInfo = (props: Props) => {
  const { postId, ...rest } = props
  const { isFetching } = useGetPostDataQuery(postId)
  return (
    <div className={s.engagement_info} {...rest}>
      <div className={s.icons_wrapper}>
        <div className={s.icons_group}>
          <button type={'button'} disabled={isFetching} aria-label="Like post">
            <HeartOutline />
          </button>
          <button type={'button'} disabled={isFetching} aria-label="Share post">
            <PaperPlaneOutline />
          </button>
        </div>
        <div className={s.icons_group}>
          <button type={'button'} disabled={isFetching} aria-label="Save post">
            <BookmarkOutline />
          </button>
        </div>
      </div>
      <div className={s.social_activity} aria-describedby="likes-count">
        <div className={s.last_likes}>
          {isFetching ? (
            <>
              <SkeletonCircle size={24} aria-hidden="true" />
              <SkeletonCircle size={24} aria-hidden="true" />
              <SkeletonCircle size={24} aria-hidden="true" />
            </>
          ) : (
            <>
              <CircleImage size={'size-24'}>
                <Image src={user} alt={'user'} />
              </CircleImage>
              <CircleImage size={'size-24'}>
                <Image src={user} alt={'user'} />
              </CircleImage>
              <CircleImage size={'size-24'}>
                <Image src={user} alt={'user'} />
              </CircleImage>
            </>
          )}
        </div>
        <span id="likes-count">
          {isFetching ? (
            <Skeleton width={'100px'} aria-label="Loading likes count" />
          ) : (
            <>
              <Typography variant={'regular_text_14'} as={'span'}>
                <span>2 243 </span>
              </Typography>
              <Typography variant={'bold_text_14'} as={'span'}>
                <span>&quot;Like&quot;</span>
              </Typography>
            </>
          )}
        </span>
      </div>
      <Typography variant={'small_text'} className={s.date} aria-label="Post date">
        July 3, 2021
      </Typography>
    </div>
  )
}
