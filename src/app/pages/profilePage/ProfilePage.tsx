'use client'

import { useGetMeQuery } from '@shared/api/userApi'
import { useEffect, useRef } from 'react'
import type { getProfileResponse } from '@widgets/profile/model/types/types'
import styles from '../../../widgets/profile/Profile.module.scss'
import Link from 'next/link'
import { ROUTES } from '@shared/constants/routes'
import Image from 'next/image'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { profileApi, useLazyGetUserProfileQuery } from '@widgets/profile/api/profileApi'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import InfiniteScroll from 'react-infinite-scroll-component'
import clsx from 'clsx'

type Props = {
  initialProfileData: getProfileResponse
  userIdParam: string
}

export const ProfilePage = (props: Props) => {
  const { initialProfileData, userIdParam } = props
  const { data: meData } = useGetMeQuery()
  const [getProfilePosts, { isFetching }] = useLazyGetUserProfileQuery()
  const isAuth = !!meData
  const userId = userIdParam || initialProfileData.user.id

  /*Интересный случай при подставление первых args достаёт последний кеш, даже есть args другие  */
  const defaultInitialParams = {
    id: userId,
    page: initialProfileData.posts.page,
    limit: initialProfileData.posts.limit,
  }
  const profileDataFromCache = useAppSelector(
    state => profileApi.endpoints.getUserProfile.select(defaultInitialParams)(state).data
  )
  const currentData = profileDataFromCache || initialProfileData
  const isNeedHydrateRef = useRef(!!initialProfileData && !profileDataFromCache)
  const dispatch = useAppDispatch()

  const following = /*profileData.user?.stats?.following ||*/ '1'
  const followers = /*profileData.user?.stats?.followers ||*/ '255 M'
  const publications = /*profileData.user?.stats?.posts ||*/ '502'

  const bio = currentData.user?.profile?.aboutMe
  const username = currentData.user?.username
  const avatar = currentData.user?.url
  const posts = currentData.posts.items
  const currentPostsLength = currentData.posts.page * currentData.posts.limit

  const infiniteScrollHandler = () => {
    if (isAuth) {
      const page = currentData.posts.page + 1
      getProfilePosts({
        id: userId,
        page,
        limit: currentData.posts.limit,
      })
    }
  }

  useEffect(() => {
    if (isNeedHydrateRef.current && initialProfileData) {
      dispatch(
        profileApi.util.upsertQueryData('getUserProfile', defaultInitialParams, initialProfileData)
      )
      isNeedHydrateRef.current = false
    }
  }, [])

  return (
    <div className={styles.profile__main}>
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
        <InfiniteScroll
          hasMore={currentData?.posts?.totalItems > currentPostsLength}
          next={infiniteScrollHandler}
          dataLength={currentPostsLength}
          loader={isFetching && isAuth && <p>Loading more...</p>}
        >
          <div
            className={clsx(styles.grid, {
              [styles.auth_user]: isAuth,
            })}
          >
            {posts.map(post => {
              const file = post.files?.[0]
              if (!file) return null

              return (
                <Link key={post.id} href={ROUTES.profile(userId) + ROUTES.post(post.id)}>
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
    </div>
  )
}
