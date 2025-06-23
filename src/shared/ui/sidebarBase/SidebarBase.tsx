'use client'
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react'
import clsx from 'clsx'
import s from './SidebarBase.module.scss'
import Link from 'next/link'

export type SidebarBaseProps = {} & ComponentPropsWithoutRef<'aside'>
type SidebarBaseNavigationProps = {} & ComponentPropsWithoutRef<'nav'>
type SidebarBaseItemProps = {
  /*asChild?:boolean,*/
  path?: string
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  isActive?: boolean
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<'li'>, 'onClick'>

export const SidebarBase = (props: SidebarBaseProps) => {
  const { className, ...rest } = props
  const classNames = clsx(s.aside, className)

  return <aside className={classNames} aria-label="Основная навигация" {...rest} />
}

export const SidebarBaseNavigation = (props: SidebarBaseNavigationProps) => {
  const { className, children, ...rest } = props
  const classNames = clsx(s.navigation, className)

  return (
    <nav className={classNames} aria-label="Боковая панель навигации" {...rest}>
      <ul className={s.list} role="menu" {...rest}>
        {children}
      </ul>
    </nav>
  )
}

export const SidebarBaseItem = (props: SidebarBaseItemProps) => {
  const {
    className,
    children,
    path,
    icon,
    onClick,
    isActive = false,
    disabled = false,
    ...rest
  } = props

  const classNames = clsx(s.item, className, {
    [s.disabled]: disabled,
    [s.active]: isActive,
  })

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  return (
    <>
      {path ? (
        <li className={classNames} role="none" {...rest}>
          {disabled ? (
            <span aria-disabled="true" role="menuitem">
              {content}
            </span>
          ) : (
            <Link
              aria-disabled={disabled}
              href={disabled ? {} : path}
              onClick={onClick}
              role="menuitem"
              aria-current={isActive && 'page'}
            >
              {content}
            </Link>
          )}
        </li>
      ) : (
        <div className={`${classNames} ${s.logOut}`}>
          <button
            aria-disabled={disabled}
            disabled={disabled}
            type={'button'}
            onClick={onClick}
            role="menuitem"
            aria-pressed={isActive && 'true'}
          >
            {content}
          </button>
        </div>
      )}
    </>
  )
}
