import localeEn from 'air-datepicker/locale/en'
import type { AirDatepickerOptions } from 'air-datepicker'
import type { DatePickerProps } from '../DatePicker'

type CalendarConfigParams = {
  id: string
  mode: DatePickerProps['mode']
  value: DatePickerProps['value']
  handleDateChange: (dates: Date[]) => void
  validateDate: (dateStr: string) => boolean
  setIsCalendarOpen: (isOpen: boolean) => void
  inputRef: React.RefObject<HTMLInputElement> | null
}
interface CustomDatepickerElement extends HTMLElement {
  $datepicker?: HTMLElement
}
export const getCalendarConfig = ({
  id,
  mode,
  value,
  handleDateChange,
  validateDate,
  setIsCalendarOpen,
  inputRef,
}: CalendarConfigParams): AirDatepickerOptions => ({
  firstDay: 1,
  locale: localeEn,
  range: mode === 'range',
  multipleDates: mode === 'range' ? 2 : false,
  multipleDatesSeparator: mode === 'range' ? ' - ' : undefined,
  autoClose: true,
  dateFormat: 'dd/MM/yyyy',
  classes: 'custom-airdatepicker',
  selectedDates: value ? (Array.isArray(value) ? value : [value]) : [],
  navTitles: {
    days: 'MMMM yyyy',
  },
  onShow: isFinished => {
    setIsCalendarOpen(true)
    if (!isFinished) {
      const dp = document.querySelector(`#datepicker-${id}`) as CustomDatepickerElement | null

      if (dp?.$datepicker) {
        dp.$datepicker.style.display = 'block'
        dp.$datepicker.style.opacity = '1'
      }
    }
  },
  onHide: () => {
    setIsCalendarOpen(false)
    if (inputRef && inputRef.current) {
      validateDate(inputRef.current.value)
    }
  },
  onSelect: ({ datepicker }) => {
    datepicker.$datepicker.querySelectorAll('.-focus-').forEach((el: Element) => {
      el.classList.remove('-focus-')
    })
    handleDateChange(datepicker.selectedDates)
  },
  position({ $datepicker, $target, $pointer }) {
    if ($pointer) $pointer.style.display = 'none'

    const targetRect = $target.getBoundingClientRect()
    const scrollY = window.scrollY

    $datepicker.style.top = `${targetRect.bottom + scrollY}px`
    $datepicker.style.left = `${targetRect.left}px`
    $datepicker.style.width = '300px'
    $datepicker.style.opacity = '0'
    $datepicker.style.transition = 'opacity 0.2s ease'
    $datepicker.style.pointerEvents = 'none'

    setTimeout(() => {
      $datepicker.style.opacity = '1'
      $datepicker.style.pointerEvents = 'auto'
    }, 10)

    return function hide() {
      $datepicker.style.opacity = '0'
      $datepicker.style.pointerEvents = 'none'
      setTimeout(() => {
        $datepicker.style.display = 'none'
      }, 200)
    }
  },
  onRenderCell: ({ date, cellType, datepicker }) => {
    const type = cellType as string
    const baseStyle = ` font-family: var(--font-family), 
                        sans-serif; 
                        line-height: var(--line-height-normal); 
                        font-size: 16px; 
                        width: 36px; 
                        height: 36px;`

    if (type === 'day') {
      const dayNumber = date.getDate().toString()
      const day = date.getDay()
      const currentMonth = datepicker.viewDate.getMonth()
      const currentYear = datepicker.viewDate.getFullYear()
      const isOtherMonth = date.getMonth() !== currentMonth || date.getFullYear() !== currentYear

      if (day === 0 || day === 6) {
        return {
          html: dayNumber,
          attrs: {
            style: `color: ${isOtherMonth ? 'var(--light-900)' : 'var(--danger-300)'}; 
                  font-weight: 400; 
                  ${baseStyle}`,
          },
        }
      }

      if (date.toDateString() === new Date().toDateString()) {
        return {
          html: dayNumber,
          attrs: {
            style: `color: ${isOtherMonth ? 'var(--primary-300)' : 'var(--primary-500)'}; 
                  font-weight: 700; 
                  ${baseStyle}`,
          },
        }
      }

      return {
        html: dayNumber,
        attrs: {
          style: `color: ${isOtherMonth ? 'var(--light-900)' : 'var(--light-100)'}; 
                font-weight: 400; 
                ${baseStyle}`,
        },
      }
    }

    if (cellType === 'day') {
      return {
        attrs: {
          'data-cell-type': 'day',
        },
      }
    }

    return undefined
  },
})
