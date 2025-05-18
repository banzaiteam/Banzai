'use client'
import { Button as RadixButton, ButtonProps } from '@radix-ui/themes';
import styles from './Button.module.scss';

type Props = Omit<ButtonProps, 'variant'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'text-button' | 'variant21'
  children: React.ReactNode;
  width?: string;
  height?: string;
};

export const Button: React.FC<Props> = ({
                                          className = '',
                                          variant = 'primary',
                                          children,
                                          width = 'fit-content',
                                          height = '36px',
                                          ...rest
                                          }) => {
  const combinedClasses = `${styles.button} ${styles[variant]} ${className}`

  return (
    <div className={styles.wrapper}>
      <RadixButton className={combinedClasses} style={{ width, height }} {...rest}>
        {children}
      </RadixButton>
    </div>
  );
};