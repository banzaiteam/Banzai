import React from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import s from './Popup.module.scss'
import {Card} from "@shared/ui";
import {clsx} from "clsx";
import {VisuallyHidden} from "@radix-ui/themes";

type PopupSize = "sm" | "md" | "lg"
export type PopupProps = Dialog.DialogProps & {
  size?: PopupSize
}


export const Popup = (props: PopupProps) => {

  const { children,size,...rest } = props

  return <Dialog.Root {...rest} >
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay  className={s.overlay} />
        <Dialog.Content className={clsx(s.content,{
          [s.sm]:size==='sm',
          [s.md]:size==='md',
          [s.lg]:size==='lg',
        }) }>
          <Dialog.Title className={s.title}>
            {/* Если заголовок не нужен визуально, можно скрыть его */}
            <VisuallyHidden>Диалоговое окно</VisuallyHidden>
          </Dialog.Title>
          <Card>
            {children}
          </Card>
        </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
