'use client'
import styles from './Skeleton.module.scss'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string
  className?: string
  children?: React.ReactNode
}

type SkeletonRectProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string
}

type SkeletonCircleProps = {
  size?: string | number
}

export const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className = '',
  children,
}: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    >
      {children}
    </div>
  )
}

export const SkeletonRect = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
}: SkeletonRectProps) => {
  return (
    <div
      className={styles.skeleton__rect}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    />
  )
}

export const SkeletonCircle = ({ size = '40px' }: SkeletonCircleProps) => {
  return (
    <div
      className={styles.skeleton__circle}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    />
  )
}
