'use client'
import { ShowPost } from '@features/showPost/ui/ShowPost'
import React from 'react'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default function Page(props: Props) {
  const { id } = React.use(props.params)

  return <ShowPost id={id} />
}
