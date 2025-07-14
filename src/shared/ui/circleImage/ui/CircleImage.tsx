import React, { type ComponentPropsWithoutRef, type ReactElement } from 'react'
import { clsx } from 'clsx'
import s from './CircleImage.module.scss'
import type { ImageProps } from 'next/image'
import type { Size } from '@shared/ui/circleImage/model/types'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  size?: Size
  children: ReactElement<ImageProps>
}

export const CircleImage = (props: Props) => {
  const { size = 'size-36', className, ...rest } = props

  const styles = clsx(s.wrapper, className, s[size])

  return <div className={styles} {...rest} />
}
