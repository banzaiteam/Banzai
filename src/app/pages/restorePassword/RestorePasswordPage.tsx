'use client'

import { NewPasswordForm } from '@/features'

export const RestorePasswordPage = ({ email }: { email: string }) => {
  return <NewPasswordForm email={email} />
}
