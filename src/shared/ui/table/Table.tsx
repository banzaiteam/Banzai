import React from 'react'
import styles from './Table.module.scss'

type Column<T> = {
  header: string
  accessor: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
  className?: string
}

export const Table = <T,>({ data, columns, className }: TableProps<T>) => {
  return (
    <table className={`${styles.table} ${className || ''}`}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as any)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export type { Column }
