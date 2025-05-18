 "use client"
import ReCAPTCHA from "react-google-recaptcha";
import { useRef} from "react";
import s from "./Recaptcha.module.scss";
import clsx from 'clsx'

type Props = {
    className?: string
    error?: string | null
    onVerifyAction: (value: string | null) => void
}

export const Recaptcha  = ({ className, error, onVerifyAction }: Props) => {
    const siteKey = process.env.NEXT_PUBLIC_SITE_KEY ?? ""
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const onChangeHandler = (value: string | null) => { //срабатывает при успешном прохождении
       onVerifyAction(value)
    }

    return (
        <div className={clsx(s.container, className, { [s.errorBorder]: error })}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={onChangeHandler}
                    theme="dark"
                />
            {error && <span className={s.errorLabel}>{error}</span>}
        </div>
    )
}