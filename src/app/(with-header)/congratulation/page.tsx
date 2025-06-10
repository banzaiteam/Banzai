"use client";
import {PresentationPage} from "@features/login/ui/presentationPage/PresentationPage";
import {Button} from "@shared/ui";
import s from "./Page.module.scss";
import Link from "next/link";
import Image from "next/image";
import ImageCongratulations from "@/assets/auth/congratulations.webp";



export default function Page() {
    return <PresentationPage title={'Congratulations!'} subTitle={'Your email has been confirmed'}>

        <div className={s.button_wrapper}>
            <Button variant={'primary'} asChild width={'182px'}>
                <Link href={'/signIn'}>Sign In</Link>
            </Button>
        </div>

        <Image src={ImageCongratulations} alt={'Congratulations Image'} />
    </PresentationPage>
}