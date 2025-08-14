import user from '@/assets/images/User.png'
import type { StaticImageData } from 'next/image'

export type MocComment = { text: string; title: string; image: StaticImageData; like?: boolean }

export const MOC_COMMENTS_DATA: MocComment[] = [
  {
    title: 'UrlProfile',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
  },
  {
    title: 'UrlProfile',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: true,
  },
  {
    title: 'UrlProfile',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: false,
  },
  {
    title: 'UrlProfile',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: user,
    like: true,
  },
]
