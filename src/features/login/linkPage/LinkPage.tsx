import type {ComponentPropsWithoutRef, ReactNode} from "react";
import {defaultBodyLinkPage} from "@features/login/linkPage/data";
import s from './LinkPage.module.scss'
import {clsx} from "clsx";
import Link from "next/link";
import {ArrowBackOutline} from "@/assets/icons/components";

type Props = {
    title: string;
    body?:ReactNode;
} & ComponentPropsWithoutRef<'div'>




export const LinkPage = (props:Props) => {

 const {body = defaultBodyLinkPage, title,className,children, ...rest} = props



    return (
        <div {...rest} className={clsx(s.page,className)}>
            <Link href={'/'} className={s.link_to_back}><span><ArrowBackOutline /></span>Back to Sign Up</Link>

            <div className={s.wrapper}>
                <h2 className={s.title}>{title}</h2>
               <div className={s.content}>
                   {children ? children : body}
               </div>
            </div>
        </div>
    );
};

