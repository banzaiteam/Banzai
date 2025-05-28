import React, { type ComponentPropsWithoutRef } from 'react'
import s from './Navigation.module.scss'
import {clsx} from "clsx";
import Link from "next/link";
import {createPortal} from "react-dom";

type MenuProps = {} & ComponentPropsWithoutRef<'nav'>
type MenuItemProps = {path:string,label?:string,isActive?:boolean} & ComponentPropsWithoutRef<'li'>
type MenuListProps = {} & ComponentPropsWithoutRef<'ul'>


export const Navigation = (props: MenuProps) => {
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
  const {className,path,label,children,isActive=false,...rest} = props
  return (
      <li className={clsx(s.item,isActive && s.active,className) } {...rest}>
          <Link href={path} aria-label={label} role="menuitem" passHref>
              {children}
          </Link>
      </li>
  )
}


