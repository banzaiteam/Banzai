import { RestorePasswordPage } from '@/app/pages'

export default async function Page({ params }: { params: { email: string } }) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  return <RestorePasswordPage email={decodedEmail} />
}
