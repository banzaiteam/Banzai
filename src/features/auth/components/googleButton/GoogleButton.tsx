import { GoogleSvgrepoCom1 } from '@/assets/icons/components'
import React from 'react'
import { useLazyGoogleQuery } from '@features/auth/api/api'
import Link from 'next/link'

type Props = {}

export const GoogleButton = (props: Props) => {
  /*const [getGoogleAuth] = useLazyGoogleQuery()*/

  /* const onClickHandler = async () => {
    try {
      const response = await getGoogleAuth() /!*.unwrap()*!/
      console.log(response)
    } catch (error) {}
  }*/

  return (
    /* <button onClick={onClickHandler} aria-label="Sign up with Google" type={'button'}>
      <GoogleSvgrepoCom1 width={36} height={36} viewBox="0 0 24 24" />
    </button>*/
    <Link
      href={
        'https://accounts.google.com/o/oauth2/v2/auth?client_id=704585299775-o91opnriljtokoelmpm0ahr4087cn9jr.apps.googleusercontent.com&redirect_uri=https://gate.yogram.ru/api/v1/auth/google/callback&scope=openid%20profile%20email&response_type=code'
      }
      aria-label="Sign up with Google"
    >
      <GoogleSvgrepoCom1 width={36} height={36} viewBox="0 0 24 24" />
    </Link>
  )
}
