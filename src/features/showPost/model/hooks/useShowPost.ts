'use client'
import { store } from '@/app/store'
import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'
import { usePreviousPath } from '@shared/hooks/usePreviousPath'

export const useShowPost = ({ onClose, id, postData }: ShowPostProps) => {
  const [inputValue, setInputValue] = useState('')
  const { data: meData } = useGetMeQuery()
  const { data, isFetching } = useGetPostDataQuery(id as string, { skip: !!postData })
  const safeBack = usePreviousPath('/profile')
  const postId = id || postData?.items[0].id
  const isOwnerPost = meData?.id === postId
  if (!postId) {
    throw new Error('ID не найден')
  }

  const dataImages = postData || data
  const urlImages = dataImages?.items[0].files.map(file => file.url)

  const onCloseHandler = () => {
    onClose?.(false)
    safeBack()
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
    meData,
    postId,
    inputValue,
    setInputValue,
    isOwnerPost,
  }
}
