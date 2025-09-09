import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { ComponentPropsWithoutRef, useId } from 'react'
import s from './RadioGroup.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = ({ label, id, ...rest }: Props) => {
  const idDefault = useId()
  const uniqueId = id || idDefault

  return (
    <div className={s.container}>
      <RadioGroupRadix.Root className={s.radioGroup} {...rest}>
        <RadioGroupRadix.Item className={s.item} id={uniqueId} value={uniqueId}>
          <RadioGroupRadix.Indicator className={s.indicator} />
        </RadioGroupRadix.Item>
        {label && (
          <label className={s.label} htmlFor={uniqueId}>
            {label}
          </label>
        )}
      </RadioGroupRadix.Root>
    </div>
  )
}
