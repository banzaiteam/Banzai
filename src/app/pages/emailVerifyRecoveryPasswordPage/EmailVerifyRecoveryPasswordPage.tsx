'use client'

import EmailVerifyRecoveryPassword from '@features/auth/email-verify-recovery-password/ui/EmailVerifyRecoveryPassword'

export const EmailVerifyRecoveryPasswordPage = ({ email }: { email: string }) => {
  return <EmailVerifyRecoveryPassword email={email} />
}
