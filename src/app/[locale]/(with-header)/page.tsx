import { HomePage } from '@/app/pages/homePage/HomePage'

export const metadata = {
  title: 'P i k s t a',
  description: 'Piksta is a platform for discovering and supporting creators.',
  keywords: ['photo sharing app', 'photos', 'piksta'],
  authors: [{ name: 'Banzai Team', url: 'https://github.com/banzaiteam/Banzai' }],
  creator: 'Banzai Team',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function Page() {
  return <HomePage />
}
