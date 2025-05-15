import { TextArea, TextAreaProps } from '@radix-ui/themes';
import styles from './RadixTextarea.module.scss';

type Props = TextAreaProps & {
  error?: boolean;
  errorMessage?: string;
};

export const RadixTextarea: React.FC<Props> = ({
                                                 className = '',
                                                 error = false,
                                                 errorMessage,
                                                 disabled,
                                                 ...rest
                                               }) => {
  return (
    <div className={styles.wrapper}>
      <TextArea
        className={`${styles.textarea} ${error ? styles.error : ''} ${className}`}
        disabled={disabled}
        {...rest}
      />
      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};