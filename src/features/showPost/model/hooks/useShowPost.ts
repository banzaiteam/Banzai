'use client'
import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { usePreviousPath } from '@/features'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'

export const useShowPost = ({ onClose, id, postData }: ShowPostProps) => {
  const { data: meData } = useGetMeQuery()

  const [isNeedHydrate, setIsNeedHydrate] =
    useState(
      !!postData
    ) /*for update after request(add comment), to we`ll see +1 comment in the list-comments*/

  const postId = id || postData?.items[0].id

  const { data, isFetching, isLoading } = useGetPostDataQuery(postId as string, {
    skip: isNeedHydrate,
  })

  const routerBack = usePreviousPath('/profile')

  const dispatch = useAppDispatch()
  const isOwnerPost = meData?.id === postId

  if (!postId) {
    throw new Error('ID не найден')
  }
  const dataImages = data || postData
  const dataComments = (data || postData)?.items[0].comments
  const urlImages = dataImages?.items[0].files.map(file => file.url)

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
      if (postData) {
        dispatch(showPostApi.util.upsertQueryData('getPostData', postId, postData))
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
    dataComments,
    meData,
    postId,
    isOwnerPost,
  }
}
