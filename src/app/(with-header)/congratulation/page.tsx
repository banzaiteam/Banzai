"use client";
import {PresentationPage} from "@features/login/ui/presentationPage/PresentationPage";
import {Button} from "@shared/ui";
import s from "./Page.module.scss";
import Link from "next/link";

export default function Page() {
    return <PresentationPage title={'Congratulations!'} subTitle={'Your email has been confirmed'}>

        <div className={s.button_wrapper}>
            <Button variant={'primary'} asChild width={'182px'}>
                <Link href={'/'}>Sign In</Link>
            </Button>
        </div>

        {/*image*/}
    </PresentationPage>
}