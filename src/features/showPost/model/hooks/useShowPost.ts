'use client'
import { store } from '@/app/store'
import React, { useEffect } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { usePreviousPath } from '@/features'

export const useShowPost = ({ onClose, id, postData }: ShowPostProps) => {
  const { data: meData } = useGetMeQuery()
  const { data, isFetching } = useGetPostDataQuery(id as string, { skip: !!postData })
  const routerBack = usePreviousPath('/profile')
  const postId = id || postData?.items[0].id
  const isOwnerPost = meData?.id === postId
  if (!postId) {
    throw new Error('ID не найден')
  }

  const dataImages = postData || data
  const dataComments = (postData || data)?.items[0].comments
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
    if (postData)
      store.dispatch(
        showPostApi.util.upsertQueryData('getPostData', postData?.items[0].id, postData)
      )
  }, [postData])

  return {
    onCloseHandler,
    onClickHandler,
    isFetching,
    urlImages,
    dataComments,
    meData,
    postId,
    isOwnerPost,
  }
}
