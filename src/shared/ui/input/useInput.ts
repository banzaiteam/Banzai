import {type ChangeEvent, useCallback, useState} from "react";

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  const reset = () => setValue('')

  return {
    value,
    onChange,
    reset
  }
}
