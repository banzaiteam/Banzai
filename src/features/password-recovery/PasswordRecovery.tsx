'use client'
import {Button, Card, Input, Recaptcha, Typography} from '@shared/ui';
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './PasswordRecovery.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import {passwordRecoverySchema} from "@features/password-recovery/lib/schemas";


type Inputs = {
    email: string
}

export const PasswordRecovery = () => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(passwordRecoverySchema),
        defaultValues: { email: ''}
    })

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
    }

    return (
        <Card className={s.card}>
            <Typography as={'h1'} variant={'h1'} className={s.h1}>Forgot Password</Typography>
            <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type={'email'}
                    subTitle={'Email'}
                    placeholder={'Epam@epam.com'}
                    error={!!errors.email}
                    {...register('email')}
                >
                </Input>
                <Typography variant={'regular_text_14'} className={s.formDescription}>
                    Enter your email address and we will send you further instructions
                </Typography>
                <Button variant={'primary'} className={s.buttonPrimary}>
                    Send Link
                </Button>
            </form>

            <div className={s.buttonWrapper}>
                <Button variant={'text-button'} className={s.buttonText}>
                    Back to Sign in
                </Button>
            </div>


            <Recaptcha
                onVerifyAction={() => {
                }}
                className={s.recaptcha}
            />
        </Card>
    )

}