import { RestorePasswordPage } from '@/app/pages'

type PageProps = {
  params: Promise<{ email: string }>
}

export default async function Page({ params }: PageProps) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  return <RestorePasswordPage email={decodedEmail} />
}
