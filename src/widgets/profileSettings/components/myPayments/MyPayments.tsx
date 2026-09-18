import { useEffect, useState } from 'react'
import { Table } from '@/shared/ui/table'
import type { Column } from '@/shared/ui/table'
import { Pagination } from '@/shared/ui'
import styles from './MyPayments.module.scss'

type Payment = {
  createdAt: string
  updatedAt: string
  price: number
  paymentType: string
  method: string
}

type PaymentsResponse = {
  items: Payment[]
}

const columns: Column<Payment>[] = [
  { header: 'Date of Payment', accessor: 'createdAt' },
  { header: 'End date of subscription', accessor: 'updatedAt' },
  { header: 'Price', accessor: 'price' },
  { header: 'Next Payment', accessor: 'updatedAt' },
  { header: 'Payment Type', accessor: 'paymentType' },
]

const PAGE_SIZE = 10

const fetchPayments = async () => {
  const token = localStorage.getItem('accessToken')

  const request = await fetch('https://gate.yogram.ru/api/v1/business/payments?payment=paypal', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return request.json()
}

export const MyPayments = () => {
  const [data, setData] = useState<PaymentsResponse | null>(null)
  useEffect(() => {
    const getPayments = async () => {
      const payments = await fetchPayments()
      setData(payments)
    }

    getPayments()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)

  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const totalPages = Math.ceil(data?.items?.length ?? 0 / PAGE_SIZE)

  return (
    <section className={styles.wrapper}>
      {data?.items && <Table data={data.items.slice(start, end)} columns={columns} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  )
}
