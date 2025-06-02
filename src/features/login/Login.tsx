import React, {useState} from 'react'
import s from './Login.module.scss'
import {EyeOffOutline, EyeOutline, GithubSvgrepoCom31, GoogleSvgrepoCom1} from "@/assets/icons/components";
import {Input, InputSlot} from "@shared/ui";
import {Checkbox} from "@shared/ui/checkbox/Checkbox";
import {Button} from "@shared/ui/button/Button";

export type LoginProps = {}

export const Login = (props: LoginProps) => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false)


    const onClickHandler = () =>{
        alert('Нажмал')
    };
    return <div className={s.login}>
        <form className={s.wrapper} role="form" aria-labelledby="signup-heading">
            <h2 className={s.title} id="signup-heading">Sign Up</h2>
            <div className={s.button_icon_group} role="group" aria-label="Social sign up">
                <button onClick={onClickHandler}  aria-label="Sign up with Google">
                    <GoogleSvgrepoCom1 width={36} height={36} viewBox="0 0 24 24"/>
                </button>
                <button onClick={onClickHandler} aria-label="Sign up with GitHub">
                    <GithubSvgrepoCom31 width={36} height={36} viewBox="0 0 24 24"/>
                </button>
            </div>
            <div className={s.input_group}>
                <Input subTitle={'Username'} placeholder={'Epam'}  aria-required="true" error helperText={'Minimum number of characters 6'}/>
                <Input subTitle={'Email'} type={'email'} placeholder={'Epam@epam.com'} aria-required="true" error helperText={'Mini asd as dsad asd asd mum number of characters 6'}/>



                <Input subTitle={'Password'} type={isShowPassword ? 'text' : 'password'} placeholder={'******************'} aria-required="true">
                    <InputSlot onClick={() => {
                        setIsShowPassword((prev) => !prev)
                    }}  aria-label={isShowPassword ? "Hide password" : "Show password"}>
                        {isShowPassword ? <EyeOutline/> : <EyeOffOutline/>}
                    </InputSlot>
                </Input>



                <Input subTitle={'Password confirmation'} type={isShowPasswordConfirmation ? 'text' : 'password'}
                       placeholder={'******************'} aria-required="true">
                    <InputSlot onClick={() => {
                        setIsShowPasswordConfirmation((prev) => !prev)
                    }} aria-label={isShowPasswordConfirmation ? "Hide password confirmation" : "Show password confirmation"}>
                        {isShowPasswordConfirmation ? <EyeOutline/> : <EyeOffOutline/>}
                    </InputSlot>
                </Input>
            </div>
            <div className={s.checkbox_wrapper}>
                <Checkbox aria-labelledby="terms-label"/>
                <span id="terms-label">I agree to the <a href="/" aria-label="Terms of Service">
                        Terms of Service
                    </a> and <a href="/" aria-label="Privacy Policy">
                        Privacy Policy
                    </a>
                </span>
            </div>
            <div className={s.button_wrapper}>
                <Button onClick={onClickHandler} width={'100%'} aria-label="Sign up for a new account">Sign Up</Button>
            </div>
            <span className={s.question}>Do you have an account?</span>
            <Button variant={'text-button'} onClick={onClickHandler} aria-label="Sign in to your account">Sign In</Button>
        </form>
    </div>
}
