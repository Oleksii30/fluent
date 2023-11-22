import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'context/auth'
import Session from 'components/session'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <>
        <Session />
        <Component {...pageProps} />
      </>
    </AuthProvider>
  )
}
