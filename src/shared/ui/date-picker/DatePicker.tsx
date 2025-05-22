import { useRef, ChangeEvent } from 'react';
import { useDatePickerState } from '@react-stately/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import { CalendarDate, CalendarDateTime, ZonedDateTime, parseDate } from '@internationalized/date';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useLocale } from '@react-aria/i18n'; // Добавляем импорт useLocale
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Добавляем импорт иконок
import { DateValue } from '@internationalized/date';

type AriaDateValue = CalendarDate | CalendarDateTime | ZonedDateTime;

interface DatePickerProps {
  label?: string;
  value?: AriaDateValue | null;
  onChange?: (value: AriaDateValue | null) => void;
  minValue?: AriaDateValue;
  maxValue?: AriaDateValue;
  isDisabled?: boolean;
  className?: string;
  errorMessage?: string;
}

export function DatePicker(props: DatePickerProps) {
  const state = useDatePickerState({
    ...props,
    onChange: props.onChange || (() => {}),
  });

  const ref = useRef<HTMLDivElement>(null);
  const {
    groupProps,
    labelProps,
    fieldProps: ariaFieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  // Создаем совместимые пропсы для input
  const inputProps = {
    ...ariaFieldProps,
    value: state.value?.toString() || '',
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const date = e.target.value ? parseDate(e.target.value) : null;
        state.setValue(date);
        props.onChange?.(date);
      } catch {
        props.onChange?.(null);
      }
    },
    // Явно указываем, что defaultValue не используется
    defaultValue: undefined as unknown as string,
    className: "flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  };

  return (
    <div className={`flex flex-col ${props.className || ''}`}>
      {props.label && (
        <label {...labelProps} className="mb-1 text-sm font-medium">
          {props.label}
        </label>
      )}
      
      <div {...groupProps} ref={ref} className="flex">
        <input {...inputProps} />
        <button
          {...buttonProps}
          className="rounded-r-md border border-l-0 border-gray-300 bg-gray-100 px-3 py-2 hover:bg-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <CalendarIcon className="h-5 w-5" />
        </button>
      </div>

      {props.errorMessage && (
        <div className="mt-1 text-sm text-red-600">{props.errorMessage}</div>
      )}

      {state.isOpen && (
        <div className="absolute z-10 mt-1 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
          {/* Calendar implementation */}
        </div>
      )}
    </div>
  );
}

function Calendar(props: any) {
  const { locale } = useLocale();
  const state = useCalendarState({ 
    ...props,
    locale // Передаем locale в состояние календаря
  });

  const { 
    calendarProps, 
    prevButtonProps, 
    nextButtonProps, 
    title 
  } = useCalendar(props, state);

  return (
    <div {...calendarProps} className="calendar">
      <div className="mb-4 flex items-center justify-between">
        <button 
          {...prevButtonProps} 
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <h2 className="font-semibold">{title}</h2>
        <button 
          {...nextButtonProps} 
          className="rounded-full p-2 hover:bg-gray-100"
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

function CalendarGrid({ state }: { state: any }) {
  const { gridProps, headerProps, weekDays } = useCalendarGrid({}, state);
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, state.locale);

  return (
    <table {...gridProps} className="w-full">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day: string, index: number) => (
            <th key={index} className="pb-2 text-xs font-medium text-gray-500">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state.getDatesInWeek(weekIndex).map((date: DateValue | null, i: number) => (
              <td key={i} className="py-1 text-center">
                {date && <CalendarCell state={state} date={date} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CalendarCell({ state, date }: { state: any; date: DateValue }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell({ date }, state, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`h-8 w-8 rounded-full text-sm ${
        isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
      } ${isDisabled ? 'text-gray-300' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      {formattedDate}
    </button>
  );
}

// Вспомогательные функции и типы
function getWeeksInMonth(startDate: DateValue, locale: string) {
  // Реализация функции
  return 6; // Примерное значение
}

function useCalendarState(props: any) {
  // Заглушка для реализации
  return props;
}

function useCalendar(props: any, state: any) {
  // Заглушка для реализации
  return {
    calendarProps: {},
    prevButtonProps: {},
    nextButtonProps: {},
    title: 'Calendar',
  };
}

function useCalendarGrid(props: any, state: any) {
  // Заглушка для реализации
  return {
    gridProps: {},
    headerProps: {},
    weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  };
}

function useCalendarCell(props: any, state: any, ref: any) {
  // Заглушка для реализации
  return {
    cellProps: {},
    buttonProps: {},
    isSelected: false,
    isDisabled: false,
    formattedDate: '1',
  };
}