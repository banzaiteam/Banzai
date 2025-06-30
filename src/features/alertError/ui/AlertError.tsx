'use client'

import React from 'react'
import { Alert } from '@shared/ui'
import s from './AlertError.module.scss'
import { useAlertError } from '@features/alertError/model/hooks/useAlertError'
import clsx from 'clsx'

export const AlertError = () => {
  const { error, onCloseHandler } = useAlertError()

  return (
    <div className={clsx(s.wrapper, !!error ? s.open : s.close)}>
      <Alert
        open={!!error}
        message={error || ''}
        status={'error'}
        duration={5000}
        onOpenChange={onCloseHandler}
        hasCloseButton={true}
      />
    </div>
  )
}
