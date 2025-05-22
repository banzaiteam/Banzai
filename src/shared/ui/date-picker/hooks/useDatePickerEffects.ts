import { useEffect } from 'react';
import AirDatepicker from 'air-datepicker';
import { calendarStyles } from '../utils/calendarStyles';
import { getCalendarConfig } from '../utils/getCalendarConfig';
import { validateDate } from '../utils/dateValidation';

export const useDatePickerEffects = (
  id: string,
  disabled: boolean,
  mode: 'single' | 'range',
  value: Date | Date[] | null,
  inputRef: React.RefObject<HTMLInputElement>,
  dpRef: React.RefObject<AirDatepicker | null>,
  handleDateChange: (dates: Date[]) => void,
  setIsCalendarOpen: (isOpen: boolean) => void,
  required: boolean
) => {
  useEffect(() => {
    if (disabled || !inputRef.current) return;

    const config = getCalendarConfig({
      id,
      mode,
      value,
      handleDateChange,
      validateDate: (dateStr: string) => {
        const result = validateDate(dateStr, mode, required);
        return result.isValid;
      },
      setIsCalendarOpen,
      inputRef
    });

    const dp = new AirDatepicker(inputRef.current, config);
    dpRef.current = dp;

    const style = document.createElement('style');
    style.textContent = calendarStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      dp.destroy();
    };
  }, [id, mode, disabled, value, handleDateChange, required, inputRef]);
};