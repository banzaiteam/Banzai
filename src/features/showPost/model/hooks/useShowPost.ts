'use client'
import React, { useEffect, useRef } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { usePreviousPath } from '@/features'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { notFound } from 'next/navigation'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { ROUTES } from '@shared/constants/routes'

type UseShowPostData = Omit<ShowPostProps, 'initialFindOneUserData'>

export const useShowPost = ({ onClose, id, initialPostData }: UseShowPostData) => {
  const { data: meData } = useGetMeQuery()
  const initialPost = initialPostData?.items[0]
  const postId = id || initialPost?.id
  const postDataFromCache = useAppSelector(
    state => showPostApi.endpoints.getPostData.select(postId as string)(state).data
  )
  const isNeedHydrateRef = useRef(
    !!initialPostData?.items && !postDataFromCache?.items
  ) /*for update after request(add comment), to we`ll see +1 comment in the list-comments*/

  const {
    data: postDataFromQuery,
    isFetching,
    isLoading,
  } = useGetPostDataQuery(postId as string, {
    skip: isNeedHydrateRef.current,
  })

  const dispatch = useAppDispatch()

  if (!postId) {
    throw new Error('ID не найден')
  }
  const post = postDataFromQuery?.items[0] || initialPost
  if (!post) {
    notFound()
  }
  const isOwnerPost = meData?.id === post.userId
  /*const routerBack = usePreviousPath('/profile')*/
  /*  Раскоментировать когда будет profile->[id]->page.tsx    */
  const routerBack = usePreviousPath(ROUTES.profile(post?.userId as string))

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
    if (isNeedHydrateRef.current && initialPostData) {
      dispatch(showPostApi.util.upsertQueryData('getPostData', postId, initialPostData))
      isNeedHydrateRef.current = false
    }
  }, [])

  return {
    onCloseHandler,
    onClickHandler,
    isFetching,
    isLoading,
    urlImages,
    comments,
    postId,
    isOwnerPost,
    post,
  }
}
