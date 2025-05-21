"use client"
import styles from './DatePicker.module.scss';
import 'air-datepicker/air-datepicker.css';
import { useRef } from 'react';
import { Label } from './label/Label';
import { ErrorMessage } from './error-message/ErrorMessage';
import { DateInput } from './date-input/DateInput';
import { useDatePickerLogic } from './hooks/useDatePickerLogic';
import { useDatePickerEffects } from './hooks/useDatePickerEffects';

export type DatePickerProps = {
  id: string
  label?: string;
  mode?: 'single' | 'range'
  disabled?: boolean
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  value?: Date | Date[] | null;
  onChange?: (date: Date | Date[] | null, isValid?: boolean) => void;
};

export const DatePicker: React.FC<DatePickerProps> = (
  {
    id,
    disabled = false,
    label = 'Date',
    mode = 'single',
    required = false,
    error: externalError = false,
    errorMessage: externalErrorMessage = '',
    value = null,
    onChange,
    ...rest
  }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isCalendarOpen,
    internalError,
    internalErrorMessage,
    dpRef,
    setIsCalendarOpen,
    handleValidation,
    handleDateChange,
    handleManualInput
  } = useDatePickerLogic(mode, required, inputRef as React.RefObject<HTMLInputElement>, onChange);

    const error = externalError || internalError;
    const errorMessage = externalErrorMessage || internalErrorMessage;

  useDatePickerEffects(
    id,
    disabled,
    mode,
    value,
    inputRef as React.RefObject<HTMLInputElement>,
    dpRef,
    handleDateChange,
    setIsCalendarOpen,
    required
  );

  const handleBlur = () => {
    if (inputRef.current) {
      handleValidation(inputRef.current.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Label id={id} label={label} disabled={disabled} required={required}/>
      <DateInput  id={id}
                  error={error}
                  isCalendarOpen={isCalendarOpen}
                  disabled={disabled}
                  onBlur={handleBlur}
                  onChange={handleManualInput}
                  ref={inputRef}
      />
      <ErrorMessage error={error} errorMessage={errorMessage}/>
    </div>
  );
};