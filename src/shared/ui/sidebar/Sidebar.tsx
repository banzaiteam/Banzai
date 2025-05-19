import type {ComponentPropsWithoutRef, MouseEventHandler, ReactNode} from "react";
import clsx from "clsx";
import s from "./Sidebar.module.scss";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {} & ComponentPropsWithoutRef<'aside'>;
type SidebarNavigationProps = {} & ComponentPropsWithoutRef<'nav'>
type SidebarGroupProps = {} & ComponentPropsWithoutRef<'ul'>
type SidebarItemProps = {
    /*asChild?:boolean,*/
    path?:string,
    icon?:ReactNode,
    onClick?: MouseEventHandler<HTMLElement>;
} & Omit<ComponentPropsWithoutRef<'li'>,'onClick'>

export const Sidebar = (props: Props) => {
    const {className,...rest} = props
    const classNames = clsx(s.aside, className);

    return (
        <aside className={classNames} {...rest} />


    );
};

export const SidebarGroup = (props:SidebarGroupProps)=>{
    const {className,...rest} = props
    const classNames = clsx(s.list, className);
    return <ul className={classNames} {...rest} />
}

export const SidebarNavigation = (props: SidebarNavigationProps)=>{
    const {className,children,...rest} = props
    const classNames = clsx(s.navigation, className);

    return <nav className={classNames} {...rest}>

            {children}

    </nav>
}


export const  SidebarItem= (props: SidebarItemProps) => {
    const {className,children,path,icon,onClick,...rest} = props
    const classNames = clsx(s.item, className);
    const pathname = usePathname();

    const content = <>{icon}{children}</>

    return <> {path ? <li className={clsx(pathname.startsWith(path) && s.active, classNames)} {...rest}>
            <Link href={path} onClick={onClick}>{content}</Link>
        </li> : <div className={classNames}>
        <button type={"button"} onClick={onClick}>{content}</button>
    </div>
    }
    </>
}
