'use client'

import { useCallback, useEffect, useState } from 'react';

export const useDateValidation = (options: {
  required?: boolean;
  mode?: 'single' | 'range';
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateSingleDate = useCallback((dateStr: string): boolean => {
    if (!dateStr) {
      if (options.required) {
        setError(true);
        setErrorMessage('Это поле обязательно для заполнения');
        return false;
      }
      return true;
    }

    // Проверка формата даты
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateStr)) {
      setError(true);
      setErrorMessage('Неверный формат даты (дд/мм/гггг)');
      return false;
    }

    // Проверка валидности даты
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      setError(true);
      setErrorMessage('Несуществующая дата');
      return false;
    }

    setError(false);
    setErrorMessage('');
    return true;
  }, [options.required]);

  const validateDateRange = useCallback((dateStrings: string[]): boolean => {
    if (dateStrings.length === 0 && options.required) {
      setError(true);
      setErrorMessage('Необходимо выбрать диапазон дат');
      return false;
    }

    // Проверяем каждую дату в диапазоне
    const allValid = dateStrings.every(dateStr => {
      if (!dateStr) return false;
      return validateSingleDate(dateStr);
    });

    if (!allValid) return false;

    // Дополнительная проверка для диапазона (например, что начальная дата раньше конечной)
    if (dateStrings.length === 2) {
      const [start, end] = dateStrings.map(str => {
        const [d, m, y] = str.split('/').map(Number);
        return new Date(y, m - 1, d);
      });

      if (start > end) {
        setError(true);
        setErrorMessage('Конечная дата не может быть раньше начальной');
        return false;
      }
    }

    setError(false);
    setErrorMessage('');
    return true;
  }, [options.required, validateSingleDate]);

  const validate = useCallback((input: string | string[]): boolean => {
    if (options.mode === 'range') {
      const dates = Array.isArray(input) ? input : [input];
      return validateDateRange(dates);
    }
    return validateSingleDate(input as string);
  }, [options.mode, validateDateRange, validateSingleDate]);

  return {
    error,
    errorMessage,
    validate,
    setError,
    setErrorMessage,
  };
};