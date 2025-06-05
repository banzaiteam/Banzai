'use client'
import React, {useEffect} from 'react'
import s from './Login.module.scss'
import {GithubSvgrepoCom31, GoogleSvgrepoCom1} from "@/assets/icons/components";
import {Checkbox} from "@shared/ui/checkbox/Checkbox";
import {Button} from "@shared/ui/button/Button";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useSignUpMutation} from "@features/login/api/login.api";
import {useDispatch} from "react-redux";
import {login} from "@shared/store/slices/appSlice";
import {useRouter} from "next/navigation";
import {Card, Input, Typography} from "@shared/ui";

export type LoginProps = {}
type FormData = z.infer<typeof schema>

const schema = z.object({
    username: z.string().nonempty('Username is required').min(6, 'Minimum number of characters 6').max(30, 'Maximum number of characters 30'),
    email: z.string().nonempty('Email is required').email('The email must match the format example@example.com'),
    password: z.string().nonempty('Password is required').min(6, 'Minimum number of characters 6').max(30, 'Maximum number of characters 30').regex(/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, {
        message: "Must contain at least one special character: !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    }),
    confirmPassword: z.string().nonempty('Confirm Password is required'),
    agreement: z.literal(true, {
        errorMap: () => ({message: "You must accept the terms"}),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Указываем, к какому полю привязать ошибку
})


export const Login = (props: LoginProps) => {

    const [signUp, {isLoading}] = useSignUpMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        control,
        trigger,
        reset,
        formState: {errors, isValid, isDirty, isSubmitting},
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreement: true,
        },
        mode: 'onBlur',

    })
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const agreement = watch('agreement');

    useEffect(() => {
        trigger('agreement')
    }, [agreement, trigger]);// для disabled button correctly
    useEffect(() => {
        if (confirmPassword) {
            trigger('confirmPassword');
        }
    }, [password, trigger, confirmPassword]);//для проверки схожести пароля и его confirmation

    const isDisabled = !isDirty || !isValid;
    const onClickHandler = () => {
        alert('Нажмал')
    };
    const onSubmitHandler: SubmitHandler<FormData> = async ({username, email, password}) => {

        try {
            const response = await signUp({
                username,
                email,
                password,
            })

            const token = response.data?.token || '123123'
            if (token) {
                localStorage.setItem('access_token', token);
                dispatch(login());
                router.push('/') // || router.back();
            }

        } catch (error) {

            alert(error)
        } finally {
            reset();
        }


    };

    return <div className={s.login}>
        <Card>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={s.wrapper} role="form"
                  aria-labelledby="signup-heading">
                <Typography className={s.title} id="signup-heading" variant="h1" as={'h1'}>Sign Up</Typography>
                <div className={s.button_icon_group} role="group" aria-label="Social sign up">
                    <button onClick={onClickHandler} aria-label="Sign up with Google">
                        <GoogleSvgrepoCom1 width={36} height={36} viewBox="0 0 24 24"/>
                    </button>
                    <button onClick={onClickHandler} aria-label="Sign up with GitHub">
                        <GithubSvgrepoCom31 width={36} height={36} viewBox="0 0 24 24"/>
                    </button>
                </div>
                <div className={s.input_group}>

                    <Input {...register('username')} disabled={isSubmitting} subTitle={'Username'} placeholder={'Epam'}
                           aria-required="true" error={!!errors.username?.message}
                           helperText={errors.username?.message}/>

                    <Input {...register('email')} disabled={isSubmitting} subTitle={'Email'} type={'email'}
                           placeholder={'Epam@epam.com'} aria-required="true" error={!!errors.email?.message}
                           helperText={errors.email?.message}/>


                    <Input {...register('password')} disabled={isSubmitting} subTitle={'Password'}
                           type={'password'} placeholder={'******************'}
                           aria-required="true" error={!!errors.password?.message}
                           helperText={errors.password?.message} />


                    <Input {...register('confirmPassword')} disabled={isSubmitting} subTitle={'Password confirmation'}
                           type={'password'}
                           placeholder={'******************'} aria-required="true"
                           error={!!errors.confirmPassword?.message || (password !== confirmPassword && !!confirmPassword)}
                           helperText={errors.confirmPassword?.message || (password !== confirmPassword ? "Passwords don't match" : undefined)} />
                </div>
                <div className={s.checkbox_wrapper}>
                    <Controller
                        name="agreement"
                        control={control}
                        rules={{required: "You must accept the terms"}}
                        render={({field}) => (
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                aria-labelledby="terms-label"
                            />
                        )}
                    />
                    <span id="terms-label">I agree to the <Link href={"/terms-of-service"}
                                                                aria-label="Terms of Service">
                        Terms of Service
                    </Link> and <Link href={"/privacy-policy"} aria-label="Privacy Policy">
                        Privacy Policy
                    </Link>
                </span>
                </div>
                <div className={s.button_wrapper}>
                    <Button disabled={isDisabled || isLoading} type={'submit'}
                            aria-label="Sign up for a new account">{isLoading ? 'Logging in...' : 'Sign Up'}</Button>
                </div>
                <span className={s.question}>Do you have an account?</span>
                <Button variant={'text-button'} onClick={onClickHandler} aria-label="Sign in to your account">Sign
                    In</Button>
            </form>
        </Card>
    </div>
}
