'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {loginSchema, LoginFormValues} from '../model/loginSchema';
import {useLoginMutation} from '../api/loginApi';

import {Card, Input, Button, Typography} from '@/shared/ui';

import styles from './LoginForm.module.scss';
import {GithubSvgrepoCom31, GoogleSvgrepoCom1} from "@/assets/icons/components";

export const LoginForm = () => {
  const router = useRouter();
  const [retryDelay, setRetryDelay] = useState(0);
  const [login, {isLoading}] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (retryDelay > 0) return;

    try {
      const response = await login(data).unwrap();
      console.log(response)
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      router.push('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      
      if (err.data?.message) {
        setError('root', { message: err.data.message });
      } else {
        setRetryDelay(2);
        const interval = setInterval(() => {
          setRetryDelay((prev) => {
            if (prev <= 1) clearInterval(interval);
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  return (
    <Card className={styles.singIn}>
      <div className={styles.block}>
        <Typography className={styles.title} variant="h1" as={'h1'}>Sign In</Typography>
        <div className={styles.box}>
          <button role={'button'}  className={styles.btn}>
            <GoogleSvgrepoCom1 width={36} height={36}/>
          </button>
          <button role={'button'}  className={styles.btn}>
            <GithubSvgrepoCom31 width={36} height={36} />
          </button>
        </div>
        <form className={styles.block} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            subTitle="Email"
            placeholder="Enter your email"
            {...register('email')}
            helperText={errors.email?.message}
            error={!!errors.email?.message}
          />

          <Input
            type="password"
            subTitle="Password"
            placeholder="Enter your password"
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />
          <Button className={styles.forgotPassword} type={'button'} variant={'text-button'}>Forgot password</Button>

          <Button variant={'primary'} className={styles.w100} type="submit" disabled={isLoading || retryDelay > 0}>
            {retryDelay > 0 ? `Try again in ${retryDelay}s` : isLoading ? 'Logging in...' : 'Sign In'}
          </Button>
          <Button className={`${styles.w100} ${styles.bntMiddle}`} variant={'text-button'} type="button" >
            Don't have an account?
          </Button>
          <Button className={`${styles.w100} ${styles.btnBottom}`} variant={'text-button'} type="button" >
            Sign Up
          </Button>
        </form>
      </div>
    </Card>
  );
};