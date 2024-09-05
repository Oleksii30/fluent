import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'context/auth';
import { ServerSideMobileProvider } from 'context/serverSideMobile';
import { FilterProvider } from 'context/filter';
import Session from 'components/session';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps<{isSsrMobile: boolean}>) {
  return (
    <FilterProvider>
      <ServerSideMobileProvider isSsrMobile={pageProps.isSsrMobile}>
        <AuthProvider>
          <>
            <Session />
            <Component {...pageProps} />
            <ToastContainer position='bottom-center'/>
          </>
        </AuthProvider>
      </ServerSideMobileProvider>
    </FilterProvider>
  )
}
