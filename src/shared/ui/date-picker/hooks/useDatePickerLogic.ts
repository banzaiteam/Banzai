import { useState, useCallback, useRef } from 'react';
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
  // Was the field in focus?
  const [isTouched, setIsTouched] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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
      // Updating the calendar (without validation)
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
    // Validate only if there was already an interaction (blur)
    if (hasInteracted) {
      handleValidation(value);
    }
  }, [handleValidation, hasInteracted]);

  const handleFocus = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);
  // Focus Lost Handler
  const handleBlur = useCallback(() => {
    // Откладываем установку isTouched, чтобы дать время на выбор даты
    setTimeout(() => {
      setIsTouched(true);
      setHasInteracted(true);
      if (inputRef.current) {
        handleValidation(inputRef.current.value);
      }
    }, 200);
  }, [handleValidation, inputRef]);

  return {
    isCalendarOpen,
    internalError,
    internalErrorMessage,
    isTouched,
    dpRef,
    setIsCalendarOpen,
    handleValidation,
    handleDateChange,
    handleManualInput,
    handleFocus,
    handleBlur
  };
};