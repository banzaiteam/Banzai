/**
 * Извлекает массив значений определенного свойства из массива объектов
 * @param array - Массив объектов
 * @param key - Ключ свойства, значения которого нужно извлечь
 * @returns Массив значений указанного свойства
 */
export const extractPropertyValues = <T extends Record<string, unknown>, K extends keyof T>(
  array: T[] = [],
  key: K
): T[K][] => {
  return array.map(item => item[key])
}
