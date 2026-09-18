import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@shared/ui'
import s from './LoginPage.module.scss'
import { PresentationPage } from '@/features'
import ImageCongratulations from '@/assets/auth/congratulations.webp'
import { ROUTES } from '@shared/constants/routes'

//redirect from email
export const LoginPage = () => {
  return (
    <PresentationPage title={'Congratulations!'} subTitle={'Your email has been confirmed'}>
      <div className={s.button_wrapper}>
        <Button variant={'primary'} asChild width={'182px'}>
          <Link href={ROUTES.signIn}>Sign In</Link>
        </Button>
      </div>

      <Image src={ImageCongratulations} alt={'Congratulations Image'} />
    </PresentationPage>
  )
}
