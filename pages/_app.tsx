import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import { Karla, Inter } from 'next/font/google'

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
})
const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
