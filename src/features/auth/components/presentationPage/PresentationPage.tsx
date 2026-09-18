import React, {type ComponentPropsWithoutRef} from 'react';
import {Typography} from "@shared/ui";
import s from "./PresentationPage.module.scss";


type Props = ComponentPropsWithoutRef<'div'> & {
    title: string
    subTitle:string
};

export const PresentationPage = (props:Props) => {

    const {children,title,subTitle,...rest} = props;

    return <div className={s.wrapper} {...rest}>
        <h1 className={s.title}>{title}</h1>
        <Typography variant={'regular_text_16'} className={s.sub_title}>{subTitle}</Typography>
        {children}
    </div>

};

