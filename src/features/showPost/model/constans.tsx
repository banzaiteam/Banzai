import user from '@/assets/images/User.png'
import type { StaticImageData } from 'next/image'

export type MocComment = { textBody: string; title: string; image: StaticImageData; like?: boolean }

export const MOC_COMMENTS_DATA: MocComment[] = [
  {
    title: 'UrlProfile',
    textBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
  },
  {
    title: 'UrlProfile',
    textBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: true,
  },
  {
    title: 'UrlProfile',
    textBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: false,
  },
  {
    title: 'UrlProfile',
    textBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: true,
  },
]
