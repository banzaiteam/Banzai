'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Input, Button, Typography } from '@/shared/ui';
import styles from './NewPasswordForm.module.scss';
import { LoginFormValues, loginSchema } from '@/features/auth/login/model/loginSchema';

// Предполагаем, что у вас есть схема валидации для нового пароля
// import { newPasswordSchema, NewPasswordFormValues } from '../model/newPasswordSchema';

export const NewPasswordForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Здесь будет логика отправки нового пароля на сервер
      // Например: await updatePassword(data);
      console.log('New password data:', data);
      
      // Имитация успешного ответа от сервера
      setSuccessMessage('Password has been successfully updated!');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Password update failed:', err);
      setError('root', { 
        message: err.data?.message || 'Failed to update password. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.newPassword}>
      <div className={styles.block}>
        <Typography className={styles.title} variant="h1" as="h1">
          Create New Password
        </Typography>

        <form className={styles.block} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="password"
            subTitle="New password"
            placeholder="Enter your password"
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />

          <div>
            <Input
              type="password"
              subTitle="Password"
              placeholder="Enter your password"
              {...register('password')}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
            />
            <span className={styles.text}>Your password must be between 6 and 20 characters</span>
          </div>

          <Button 
            width='100%'
            variant="primary" 
            className={styles.submitButton} 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Create New Password'}
          </Button>
        </form>
      </div>
    </Card>
  );
};