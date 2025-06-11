import React, {type ComponentPropsWithoutRef} from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import s from './Popup.module.scss'
import {Card} from "@shared/ui";
import {clsx} from "clsx";


type PopupSize = "xs" | "sm" | "md" | "lg" | "xl"

export type PopupProps = Dialog.DialogProps & {
    width?: number,
    size?: PopupSize,
}

type PopupHeaderProps = ComponentPropsWithoutRef<'div'> & {}

export const Popup = (props: PopupProps) => {

    const {children, size = "md", width ,...rest} = props

    return  <Dialog.Root {...rest}>
        <Dialog.Portal>
            <Dialog.Overlay className={s.overlay}/>
            <Dialog.Content style={{width: width}} className={clsx(s.content, {
                [s.xs]: size === 'xs',
                [s.sm]: size === 'sm',
                [s.md]: size === 'md',
                [s.lg]: size === 'lg',
                [s.xl]: size === 'xl',
            })}>
        <Card className={s.card}>{children}</Card>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}



export const PopupHeader = (props:PopupHeaderProps)=> {
    const {children, title, className, ...rest} = props

    return <>
    <div className={clsx(className, s.popup_header)} {...rest}>
        {children}
    </div>
    <hr/>
</>
}
