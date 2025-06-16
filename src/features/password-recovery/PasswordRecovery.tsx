'use client'
import {Button, Card, Input, Popup, Recaptcha, Typography} from '@shared/ui';
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './PasswordRecovery.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import {passwordRecoverySchema} from "@features/password-recovery/lib/schemas";
import {useForgotPasswordMutation} from "@features/password-recovery/api/passwordRecoveryApi";
import React, {useState} from "react";
import {EmailSentPopup} from "@features/signUp/ui/emailSentPopup/EmailSentPopup";


type Inputs = {
    email: string
}

export const PasswordRecovery = () => {

    const [updatePassword] = useForgotPasswordMutation()
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const [emailUser, setEmailUser] = useState('epam@epam.com')

    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        setError,
        formState: { errors, isValid, isSubmitted  },
    } = useForm<Inputs>({
        resolver: zodResolver(passwordRecoverySchema),
        defaultValues: { email: ''},
        mode: 'onChange', // Позволяет обновлять состояние формы при изменениях
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        console.log(recaptchaToken)

        if (!recaptchaToken) return

        try {
            const response = await updatePassword({
                email: data.email, // Передаем только email в тело запроса
                recaptchaToken, // reCAPTCHA-токен передается в headers, но в теле запроса НЕ нужен
            }).unwrap()

            console.log(response)

            setEmailUser(getValues('email'))
            setIsOpenPopup(true)

            reset()
            setRecaptchaToken(null)
        } catch (error: any) {
            if (error.response?.status === 404) {
                setError('email', {
                    type: 'manual',
                    message:'User with this email doesn exist',
                });
            } else {
                console.log("Something went wrong. Please try again.")
            }
        }
    }

    const onCloseHandler = () => {
        setIsOpenPopup(false)
        setEmailUser('')
    }

    const handleResendLink = () => {
        reset()
    }

    return (
        <>
            <Card className={s.card}>
                <Typography as={'h1'} variant={'h1'} className={s.h1}>Forgot Password</Typography>
                <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type={'email'}
                        subTitle={'Email'}
                        placeholder={'Epam@epam.com'}
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                        {...register('email')}
                    >
                    </Input>
                    <Typography variant={'regular_text_14'} className={s.formDescription}>
                        Enter your email address and we will send you further instructions
                    </Typography>
                    {!isSubmitted? (
                        <Button
                            variant={'primary'}
                            className={s.buttonPrimary}
                            disabled={!isValid || !recaptchaToken}
                        >
                            Send Link
                        </Button>
                        ) : (
                        <div className={s.alternativeContent}>
                            <Typography as={'span'} variant={'regular_text_14'}>
                                {'The link has been sent by email.'} <br/>
                                {'If you don’t receive an email, send the link again'}
                            </Typography>
                            <Button
                                variant={'primary'}
                                className={s.buttonPrimary}
                                onClick={handleResendLink} >
                                {'Send Link Again'}
                            </Button>
                        </div>
                        )
                    }
                </form>

                <div className={s.buttonWrapper}>
                    <Button variant={'text-button'} className={s.buttonText}>
                        Back to Sign in
                    </Button>
                </div>

                {!isSubmitted && (
                    <Recaptcha
                        onVerifyAction={setRecaptchaToken}
                        className={s.recaptcha}
                    />
                )}
            </Card>

            <EmailSentPopup title={'Email sent'} isOpenValue={isOpenPopup} onClose={onCloseHandler}>
                <p>We have sent a link to confirm your email to {emailUser}</p>
            </EmailSentPopup>
        </>

    )

}