import { EmailVerifyRecoveryPasswordPage } from '@/app/pages/emailVerifyRecoveryPasswordPage/EmailVerifyRecoveryPasswordPage'

export default async function Page({ params }: { params: { email: string } }) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  return <EmailVerifyRecoveryPasswordPage email={decodedEmail} />
}
