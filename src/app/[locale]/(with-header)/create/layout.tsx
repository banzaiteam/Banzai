import { Sidebar } from '@widgets/sidebar/ui/Sidebar'

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}
