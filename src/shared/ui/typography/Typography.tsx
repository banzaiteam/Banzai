import {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react'
import clsx from 'clsx'
import s from './Typography.module.scss'

type VariantType =
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_text_16'
    | 'bold_text_16'
    | 'regular_text_14'
    | 'medium_text_14'
    | 'bold_text_14'
    | 'small_text'
    | 'semi_bold_small_text'
    | 'regular_link'
    | 'small_link'

type Props<T extends ElementType = 'p'> = {
    as?: T
    children: ReactNode
    className?: string
    variant?: VariantType
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: Props<T>) => {
    const { as,
        children,
        className,
        variant = 'regular_text_16',
        ...rest} = props
    const Component = as || 'p'
    return (
        <Component
            className={clsx(s[variant], className)}
            {...rest}
        >
            {children}
        </Component>
    )
}