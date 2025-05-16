import {TextArea, TextAreaProps} from '@radix-ui/themes';
import styles from './RadixTextarea.module.scss';
import {clsx} from "clsx";

type Props = TextAreaProps & {
  error?: boolean;
  errorMessage?: string;
};

export const RadixTextarea: React.FC<Props> = (
  {
    error = false,
    errorMessage,
    className,
    ...rest
  }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}></p>
      <TextArea
        className={clsx(styles.textareaWrapper, error && styles.error, className)}
        {...rest}
      />
      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};