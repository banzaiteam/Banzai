import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { ComponentPropsWithoutRef } from 'react'
import s from './RadioGroup.module.scss'

type Option = {
  label: string // What the user sees
  value: string // Internal value
  disabled?: boolean // Optional: whether it's disabled
}

type Props = {
  options: Option[] // Array of radio button options
  value?: string // Currently selected value
  onValueChange?: (v: string) => void // Callback when value changes
  disabled?: boolean // Disable the whole group
  label?: string // Optional group label
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root> //ComponentPropsWithoutRe lets you pass any standard
// props that Radix RadioGroup.Root accepts — like name, required, etc.

export const RadioGroup = ({
  options,
  value,
  onValueChange,
  disabled = false,
  label,
  ...rest
  // ...rest means "grab all other props that weren’t explicitly listed.
}: Props) => {
  return (
    <div className={s.container}>
      {label && <p className={s.groupLabel}>{label}</p>}
      <RadioGroupRadix.Root
        className={s.radioGroup}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        {...rest}
      >
        {/* .Root is the main container for the radio group.
        Think of it like:
        <form>
          <!-- All radio buttons live inside this form -->
        </form>
        In React:
        <RadioGroupRadix.Root>
          Radio items go here 
        </RadioGroupRadix.Root>
        */}
        {options.map(option => (
          <div key={option.value} className={s.option}>
            <RadioGroupRadix.Item
              className={s.item}
              value={option.value}
              id={option.value}
              disabled={option.disabled}
            >
              {/* Item is each individual radio button in the group. */}
              <RadioGroupRadix.Indicator className={s.indicator} />
              {/* Indicator is a visual element that appears inside a selected radio button.
              Think of it like the little filled circle inside a selected radio:
              <Item value="basic">
                <Indicator />  ← only shows if this item is selected
              </Item>
              */}
            </RadioGroupRadix.Item>
            <label className={s.label} htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroupRadix.Root>
    </div>
  )
}
