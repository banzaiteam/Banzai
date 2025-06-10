"use client";
import {PresentationPage} from "@features/login/ui/presentationPage/PresentationPage";
import {Button, Input} from "@shared/ui";
import s from "./Page.module.scss";
import Image from "next/image";
import ImageEmailVerification from "@/assets/auth/email_verification.webp";

export default function Page() {
    return <PresentationPage title={'Email verification link expired'}
                             subTitle={'Looks like the verification link has expired. Not to worry, we can send the link again'}>
        <div className={s.email_block}>
            <Input type={'email'} placeholder={'Epam@epam.com'} subTitle={'Email'}/>
            <div className={s.button_wrapper}>
                <Button variant={'primary'} width={'100%'}>
                    Resend verification link
                </Button>
            </div>
        </div>
        <Image src={ImageEmailVerification} alt={'Email Verification Image'} />
    </PresentationPage>
}