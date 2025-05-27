import {TextArea, TextAreaProps} from '@radix-ui/themes';
import styles from './Textarea.module.scss';
import {clsx} from "clsx";

type Props = TextAreaProps & {
  errorMessage?: string;
  title: string
};

export const Textarea: React.FC<Props> = (
  {
    errorMessage,
    className,
    title,
    disabled = false,
    ...rest
  }) => {
  return (
    <div className={styles.wrapper}>
      <p className={clsx(styles.title,  disabled && styles.disabled)}>{title}</p>
      <TextArea
        className={clsx(styles.textareaWrapper, errorMessage && styles.error, className)}
        disabled={disabled}
        {...rest}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};