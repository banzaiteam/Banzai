'use client'
import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { usePreviousPath } from '@/features'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { notFound } from 'next/navigation'
import { useAppSelector } from '@shared/hooks/useAppSelector'

export const useShowPost = ({ onClose, id, initialPostData }: ShowPostProps) => {
  const { data: meData } = useGetMeQuery()
  const [isNeedHydrate, setIsNeedHydrate] =
    useState(
      !!initialPostData
    ) /*for update after request(add comment), to we`ll see +1 comment in the list-comments*/

  const initialPost = initialPostData?.items[0]
  const postId = id || initialPost?.id
  const postDataFromCache = useAppSelector(
    state => showPostApi.endpoints.getPostData.select(postId as string)(state).data
  )
  const {
    data: postDataFromQuery,
    isFetching,
    isLoading,
  } = useGetPostDataQuery(postId as string, {
    skip: isNeedHydrate,
  })

  const dispatch = useAppDispatch()
  const isOwnerPost = meData?.id === postId

  if (!postId) {
    throw new Error('ID не найден')
  }
  const post = postDataFromQuery?.items[0] || initialPost
  if (!post) {
    notFound()
  }
  const routerBack = usePreviousPath('/profile')
  /*       Раскоментировать когда будет profile->[id]->page.tsx     */
  /*const routerBack = usePreviousPath(ROUTES.profile(post?.userId as string))*/
  /* */
  const comments = post?.comments
  const urlImages = post?.files.map(file => file.url)

  const onCloseHandler = () => {
    onClose?.(false)
    routerBack()
  }
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCloseHandler()
    e.preventDefault()
  }
  useEffect(() => {
    if (isNeedHydrate) {
      if (initialPostData && !postDataFromCache) {
        dispatch(showPostApi.util.upsertQueryData('getPostData', postId, initialPostData))
      }
      setIsNeedHydrate(false)
    }
  }, [])

  return {
    onCloseHandler,
    onClickHandler,
    isFetching,
    isLoading,
    urlImages,
    comments,
    meData,
    postId,
    isOwnerPost,
  }
}
