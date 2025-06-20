'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Button, Typography } from '@/shared/ui';
import styles from './NewPasswordForm.module.scss';
import { InputPassword } from '@/features/auth/components';
import { useResetPasswordMutation } from '../api/newPasswordApi';

// Схема валидации для формы смены пароля
const newPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Тип для значений формы
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

// Тип для запроса на смену пароля
type PasswordResetRequest = {
  email: string;
  password: string;
};

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormValues) => {
    setIsSubmitting(true);
    console.log(errors)
    
    try {
      // Получаем email из параметров URL
      const email = searchParams.get('email') || '';
      
      // Подготавливаем данные для API
      const requestData: PasswordResetRequest = {
        email,
        password: data.password
      };
      
      // Отправляем запрос
      await resetPassword(requestData).unwrap();

      setSuccessMessage('Password has been successfully changed!');
      
      setTimeout(() => {
        router.push('/auth/signIn');
      }, 2000);
    } catch (err: any) {
      if (err.data?.message) {
        setError('root', { message: err.data.message });
      } else {
        setError('root', { message: 'Failed to reset password. Please try again.' });
      }
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
          <InputPassword
            subTitle="New password"
            // placeholder="Enter new password"
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />

          <div>
            <InputPassword
              subTitle='Password confirmation'
              // placeholder="Confirming new password"
              {...register('confirmPassword')}
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword?.message}
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