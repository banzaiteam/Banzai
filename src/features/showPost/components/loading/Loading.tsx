import React from 'react'
import s from './Loading.module.scss'

export const Loading = () => {
  return (
    <span className={s.loading}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  )
}
