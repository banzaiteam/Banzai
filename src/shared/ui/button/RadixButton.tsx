'use client'
import { Button, ButtonProps } from '@radix-ui/themes';
import styles from './RadixButton.module.scss';

type Props = Omit<ButtonProps, 'variant'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text-button' | 'variant21'
};

export const RadixButton: React.FC<Props> = ({
                                                variant = 'primary',
                                                ...rest
                                               }) => {
  return (
    <div className={styles.wrapper}>
      <Button
        className={`${styles.button} ${styles[variant]}`}
        {...rest}
      />
    </div>
  );
};