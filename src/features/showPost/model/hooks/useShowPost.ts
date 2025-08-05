'use client'
import { store } from '@/app/store'
import { useRouter } from '@/i18n/navigation'
import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from '@shared/api/userApi'
import type { ShowPostProps } from '@features/showPost/ui/ShowPost'
import { showPostApi, useGetPostDataQuery } from '@features/showPost/api/api'

export const useShowPost = ({ onClose, id, postData }: ShowPostProps) => {
  const postId = id || postData?.items[0].id

  if (!postId) {
    throw new Error('ID не найден')
  }

  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  const { data, isFetching } = useGetPostDataQuery(id as string, { skip: !!postData })
  const { data: meData } = useGetMeQuery()

  const dataImages = postData || data
  const urlImages = dataImages?.items[0].files.map(file => file.url)

  const onCloseHandler = () => {
    onClose?.(false)
    router.back()
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
  }
}
