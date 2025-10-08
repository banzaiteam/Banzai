import * as CheckboxRadix from '@radix-ui/react-checkbox'
import s from './Checkbox.module.scss'
import { ComponentPropsWithoutRef, useId } from 'react'
import CheckmarkOutlineNEW from '@/assets/icons/components/CheckmarkOutlineNEW'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = ({ label, id, ...rest }: Props) => {
  const idDefault = useId()
  const uniqueId = id || idDefault

  return (
    <div className={s.container}>
      <CheckboxRadix.Root className={s.checkbox} {...rest} id={uniqueId}>
        <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
          <CheckmarkOutlineNEW />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <label className={s.label} htmlFor={uniqueId}>
          {label}
        </label>
      )}
    </div>
  )
}
