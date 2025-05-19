import * as CheckboxRadix from "@radix-ui/react-checkbox";
import s from "./Checkbox.module.css";
import {ComponentPropsWithoutRef, useId} from 'react';
import CheckmarkOutline from "@/assets/icons/components/CheckmarkOutline";

type Props =   {
    label? : string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox= ({ label, ...rest}: Props) => {
    const id = useId()
    return (
        <div className={s.container}>
            <CheckboxRadix.Root
                className={s.checkbox}
                id={id}
                {...rest}
            >
                <CheckboxRadix.Indicator>
                    <CheckmarkOutline width={17} height={17} />
                </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
            {label && <label className={s.label}>
                {label}
            </label>}
        </div>
    )
}




