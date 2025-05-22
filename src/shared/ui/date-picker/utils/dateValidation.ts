export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};

export type ValidateDateFn = (dateStr: string, mode: 'single' | 'range', required: boolean) => ValidationResult;

export const validateDate: ValidateDateFn = (dateStr, mode, required) => {
  if (!dateStr) {
    return {
      isValid: !required,
      errorMessage: required ? 'This field is required' : ''
    };
  }

  // For range mode - format "dd/mm/yyyy - dd/mm/yyyy"
  const dateRegex = mode === 'range' 
    ? /^(\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4})$/
    : /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(dateStr)) {
    return {
      isValid: false,
      errorMessage: `Invalid date format (${mode === 'range' ? 'dd/mm/yyyy - dd/mm/yyyy' : 'dd/mm/yyyy'})`
    };
  }

  // Check all dates (for range - both dates)
  const datesToValidate = mode === 'range' 
    ? dateStr.split(' - ').map(part => part.trim())
    : [dateStr];

  for (const singleDate of datesToValidate) {
    const [day, month, year] = singleDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return {
        isValid: false,
        errorMessage: 'Non-existent date'
      };
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  };
};