import styles from './ErrorMessage.module.scss'

type Props = {
  error: boolean;
  errorMessage: string
}

export const ErrorMessage:React.FC<Props> = (
  { 
    error,
    errorMessage
  }) => {
  return error && (
        <div className={styles['error']}>
          <span>{'Error! '}</span>
          {errorMessage}
        </div>
      )
}
