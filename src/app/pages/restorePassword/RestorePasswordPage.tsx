'use client'

import NewPasswordForm from '@features/auth/new-password-form/ui/NewPasswordForm'

export const RestorePasswordPage = ({ email }: { email: string }) => {
  return <NewPasswordForm email={email} />
}
