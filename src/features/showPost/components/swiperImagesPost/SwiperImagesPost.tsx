import React from 'react'
import { SwiperImages } from '@shared/ui'

type Props = {
  postImages: string[]
}

export const SwiperImagesPost = ({ postImages }: Props) => {
  return <SwiperImages images={postImages} />
}
