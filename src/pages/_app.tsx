// @ts-nocheck
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';
import 'react-toastify/dist/ReactToastify.css';
import { GroupProvider } from '../hooks/GroupContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <CssBaseline />
        <GlobalStyle />
        <GroupProvider>
          <Component {...pageProps} />
        </GroupProvider>
    </>
  )
}

export default MyApp
