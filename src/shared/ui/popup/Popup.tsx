import React, {type ComponentPropsWithoutRef} from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import s from './Popup.module.scss'
import {Card} from "@shared/ui";
import {clsx} from "clsx";
import {Close} from "@/assets/icons/components";


type PopupSize = "xs" | "sm" | "md" | "lg" | "xl"

export type PopupProps = Dialog.DialogProps & {
    width?: number,
    size?: PopupSize,
    title?: string,
}

type PopupHeaderProps = ComponentPropsWithoutRef<'div'> & {
title: string,
    onClose:(e: React.MouseEvent<HTMLButtonElement>)=>void,
}
type PopupHeaderBaseProps = ComponentPropsWithoutRef<'div'>

export const Popup = (props: PopupProps) => {

    const {children, size = "md", title, width, ...rest} = props

    return <Dialog.Root {...rest} >
        <Dialog.Trigger/>
        <Dialog.Portal>
            <Dialog.Overlay className={s.overlay}/>
            <Dialog.Content style={{width: width}} className={clsx(s.content, {
                [s.xs]: size === 'xs',
                [s.sm]: size === 'sm',
                [s.md]: size === 'md',
                [s.lg]: size === 'lg',
                [s.xl]: size === 'xl',
            })}>
                <Card>
                    {children}
                </Card>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}



export const PopupHeader = (props:PopupHeaderProps)=>{
    const {children,title, onClose, ...rest} = props
    return <div {...rest} title={title}>
        <Dialog.Title>{title}</Dialog.Title>
        <div className={s.closeWrapper}>
            <button type={'button'} onClick={onClose}>
                <Close stroke={'currentColor'} />
                123123123
            </button>
        </div>
    </div>

}
export const PopupHeaderBase = (props:PopupHeaderBaseProps)=>{
    const {children ,className, ...rest} = props
    return <div className={clsx(className,s.popup_header)} {...rest}>
        {children}
    </div>
};
