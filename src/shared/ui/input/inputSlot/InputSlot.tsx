import {TextField} from "@radix-ui/themes";
import React from "react";
import s from "./InputSlot.module.scss";
import clsx from "clsx";

type Props = {} & TextField.SlotProps

export const InputSlot = (props: Props) => {
    const {className,...rest} = props
    return <TextField.Slot {...rest} className={clsx(className,s.slot)} onPointerDown={(e) => {e.stopPropagation();e.stopPropagation()}}/>


}
