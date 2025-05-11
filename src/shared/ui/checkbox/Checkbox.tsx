import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import s from "./Checkbox.module.css";
import {ComponentPropsWithoutRef} from "react";

type Props =   {
    label? : string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox= ({ label, ...rest}: Props) => (
    <div className={s.checkbox }>
        <CheckboxRadix.Root className={s.Root} {...rest}>
            <CheckboxRadix.Indicator >
                <CheckIcon />
            </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {label && <label className={s.Label}>
            {label}
        </label>}
    </div>
)
