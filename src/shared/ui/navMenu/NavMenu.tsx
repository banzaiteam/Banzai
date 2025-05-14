import React, { type ComponentPropsWithoutRef } from 'react'
import s from './NavMenu.module.scss'
import {clsx} from "clsx";
import Link from "next/link";
import {createPortal} from "react-dom";

type MenuProps = {} & ComponentPropsWithoutRef<'nav'>
type MenuItemProps = {path:string,label?:string} & ComponentPropsWithoutRef<'li'>
type MenuListProps = {} & ComponentPropsWithoutRef<'ul'>


export const NavMenu = (props: MenuProps) => {
 const {className,...rest} = props

  return (
      createPortal(<nav className={clsx(s.navigation, className)} aria-label="Основное меню навигации" {...rest}/>,document.body)

  )
}
export const NavMenuList = (props: MenuListProps) => {
    const {className, ...rest} = props
  return (
      <ul className={clsx(s.list,className)} {...rest} />
  )
}
export const NavMenuItem = (props: MenuItemProps) => {
  const {className,path,label,children,...rest} = props
  return (
      <li className={clsx(s.item,className) } {...rest}>
          <Link href={path} aria-label={label} role="menuitem" passHref>
              {children}
          </Link>
      </li>
  )
}


