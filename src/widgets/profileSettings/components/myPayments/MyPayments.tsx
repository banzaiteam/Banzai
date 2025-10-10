import { useState } from 'react'
import { Table } from '@/shared/ui/table'
import type { Column } from '@/shared/ui/table'
import { Pagination } from '@/shared/ui'
import styles from './MyPayments.module.scss'

type Payment = {
  date: string
  endDate: string
  price: string
  type: string
  method: string
}

const data: Payment[] = [
  { date: '10.10.2025', endDate: '12.12.2025', price: '$10', type: '1 day', method: 'Stripe' },
  { date: '11.10.2025', endDate: '13.12.2025', price: '$20', type: '3 days', method: 'PayPal' },
  { date: '12.10.2025', endDate: '14.12.2025', price: '$30', type: '1 week', method: 'Stripe' },
  { date: '13.10.2025', endDate: '15.12.2025', price: '$40', type: '2 weeks', method: 'Stripe' },
  { date: '14.10.2025', endDate: '16.12.2025', price: '$50', type: '1 month', method: 'PayPal' },
  { date: '15.10.2025', endDate: '17.12.2025', price: '$60', type: '2 months', method: 'Stripe' },
  { date: '16.10.2025', endDate: '18.12.2025', price: '$70', type: '3 months', method: 'Stripe' },
  { date: '17.10.2025', endDate: '19.12.2025', price: '$80', type: '6 months', method: 'PayPal' },
  { date: '10.10.2025', endDate: '12.12.2025', price: '$10', type: '1 day', method: 'Stripe' },
  { date: '11.10.2025', endDate: '13.12.2025', price: '$20', type: '3 days', method: 'PayPal' },
  { date: '12.10.2025', endDate: '14.12.2025', price: '$30', type: '1 week', method: 'Stripe' },
  { date: '13.10.2025', endDate: '15.12.2025', price: '$40', type: '2 weeks', method: 'Stripe' },
  { date: '14.10.2025', endDate: '16.12.2025', price: '$50', type: '1 month', method: 'PayPal' },
  { date: '15.10.2025', endDate: '17.12.2025', price: '$60', type: '2 months', method: 'Stripe' },
  { date: '16.10.2025', endDate: '18.12.2025', price: '$70', type: '3 months', method: 'Stripe' },
  { date: '17.10.2025', endDate: '19.12.2025', price: '$80', type: '6 months', method: 'PayPal' },
  { date: '12.10.2025', endDate: '14.12.2025', price: '$30', type: '1 week', method: 'Stripe' },
  { date: '13.10.2025', endDate: '15.12.2025', price: '$40', type: '2 weeks', method: 'Stripe' },
  { date: '14.10.2025', endDate: '16.12.2025', price: '$50', type: '1 month', method: 'PayPal' },
  { date: '15.10.2025', endDate: '17.12.2025', price: '$60', type: '2 months', method: 'Stripe' },
  { date: '16.10.2025', endDate: '18.12.2025', price: '$70', type: '3 months', method: 'Stripe' },
  { date: '17.10.2025', endDate: '19.12.2025', price: '$80', type: '6 months', method: 'PayPal' },
]

const columns: Column<Payment>[] = [
  { header: 'Date of Payment', accessor: 'date' },
  { header: 'End date of subscription', accessor: 'endDate' },
  { header: 'Price', accessor: 'price' },
  { header: 'Subscription Type', accessor: 'type' },
  { header: 'Payment Type', accessor: 'method' },
]

const PAGE_SIZE = 10

export const MyPayments = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedData = data.slice(start, end)

  const totalPages = Math.ceil(data.length / PAGE_SIZE)

  return (
    <section className={styles.wrapper}>
      <Table data={paginatedData} columns={columns} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  )
}
