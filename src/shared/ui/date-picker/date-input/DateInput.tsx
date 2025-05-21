import { Calendar, CalendarOutline } from '@/assets/icons/components';
import styles from './DateInput.module.scss'
import { forwardRef } from 'react';

type Props = {
  id: string
  error: boolean
  isCalendarOpen: boolean
  disabled: boolean
  onBlur: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DateInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      error,
      isCalendarOpen,
      disabled,
      onBlur,
      onChange,
      ...rest
    },
    ref
  ) => {
  const icon = isCalendarOpen ? <Calendar/> : <CalendarOutline/>
  const iconCombinedClasses = `${styles['icon-wrapper']} ${error ? styles['icon-error'] : ''}`
  const inputCombinedClasses = `${styles.input} ${error ? styles['input-error'] : ''}`

  return (
    <div className={styles.wrapper}>
      <input 
        id={`datepicker-${id}`} 
        type="text" 
        className={inputCombinedClasses}
        placeholder='00.00.0000'
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        ref={ref}
        autoComplete="off"
        {...rest}
      />
      <div className={iconCombinedClasses}>
        {icon}
      </div>
    </div>
  )
});