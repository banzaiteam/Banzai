// hooks/useDatePickerLogic.ts
import { useState, useCallback, RefObject, useRef } from 'react';
import { validateDate } from '../utils/dateValidation';
import AirDatepicker from 'air-datepicker';

export const useDatePickerLogic = (
  mode: 'single' | 'range',
  required: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
  onChange?: (date: Date | Date[] | null, isValid?: boolean) => void,
) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [internalErrorMessage, setInternalErrorMessage] = useState('');
  const dpRef = useRef<AirDatepicker | null>(null);

  const handleValidation = useCallback((dateStr: string) => {
    const { isValid, errorMessage } = validateDate(dateStr, mode, required);
    setInternalError(!isValid);
    setInternalErrorMessage(errorMessage);
    return isValid;
  }, [mode, required]);

  const handleDateChange = useCallback((selectedDates: Date[]) => {
    const formattedDate = selectedDates.map(date => 
      `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    );

    const displayValue = mode === 'range' 
      ? formattedDate.join(' - ')
      : formattedDate[0];

    if (inputRef && inputRef.current) {
      inputRef.current.value = displayValue;
    }

    const isValid = handleValidation(displayValue);
    const newValue = mode === 'range' ? selectedDates : selectedDates[0] || null;
    onChange?.(newValue, isValid);
    return isValid;
  }, [mode, onChange, handleValidation, inputRef]);

  const handleManualInput = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (dpRef.current) {
      const [day, month, year] = value.split('/').map(Number);
      if (day && month && year) {
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() === year &&
          date.getMonth() + 1 === month &&
          date.getDate() === day
        ) {
          dpRef.current.selectDate(date);
        }
      }
    }
    handleValidation(value);
  }, [handleValidation]);

  return {
    isCalendarOpen,
    internalError,
    internalErrorMessage,
    dpRef,
    setIsCalendarOpen,
    handleValidation,
    handleDateChange,
    handleManualInput
  };
};