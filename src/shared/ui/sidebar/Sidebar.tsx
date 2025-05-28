import type {ComponentPropsWithoutRef, MouseEventHandler, ReactNode} from "react";
import clsx from "clsx";
import s from "./Sidebar.module.scss";
import Link from "next/link";

export type SidebarProps = {} & ComponentPropsWithoutRef<'aside'>;
type SidebarNavigationProps = {} & ComponentPropsWithoutRef<'nav'>
type SidebarGroupProps = {} & ComponentPropsWithoutRef<'ul'>
type SidebarItemProps = {
    /*asChild?:boolean,*/
    path?: string,
    icon?: ReactNode,
    onClick?: MouseEventHandler<HTMLElement>;
    isActive?: boolean;
    disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<'li'>, 'onClick'>

export const Sidebar = (props: SidebarProps) => {
    const {className, ...rest} = props
    const classNames = clsx(s.aside, className);

    return (
        <aside className={classNames} aria-label="Основная навигация"  {...rest} />
    );
};

export const SidebarGroup = (props: SidebarGroupProps) => {
    const {className, ...rest} = props
    const classNames = clsx(s.list, className);
    return <ul className={classNames} role="menu" {...rest} />
}

export const SidebarNavigation = (props: SidebarNavigationProps) => {
    const {className, children, ...rest} = props
    const classNames = clsx(s.navigation, className);

    return <nav className={classNames} aria-label="Боковая панель навигации" {...rest}>

        {children}

    </nav>
}

export const SidebarItem = (props: SidebarItemProps) => {

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
        [s.active]: isActive
    });

    const content = <>{icon}{children}</>

    return <> {path ?
        <li className={classNames} role="none" {...rest}>
            {disabled ? <span
                aria-disabled="true"
                role="menuitem"
            >
    {content}
  </span> : <Link aria-disabled={disabled} href={disabled ? {} : path} onClick={onClick} role="menuitem"
                  aria-current={isActive && "page"}>{content}</Link>}


        </li> : <div className={classNames}>
            <button aria-disabled={disabled} disabled={disabled} type={"button"} onClick={onClick} role="menuitem"
                    aria-pressed={isActive && "true"}>{content}</button>
        </div>


/*
*  {disabled ? (
            <span
                className={clsx(s.link, s.disabled)}
                aria-disabled="true"
                role="menuitem">
                {content}
             </span>
        ) : (
            <Link
                href={path}
                className={s.link}
                role="menuitem">
                {content}
            </Link>
        )}
*
* */


    }
    </>
}
