import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as StateProvider } from '../context/State';
import { Provider as OverlayProvider } from '../context/OverlayContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StateProvider>
        <OverlayProvider>
          <Component {...pageProps} />
        </OverlayProvider>
      </StateProvider>
    </>
  );
}

export default MyApp;
