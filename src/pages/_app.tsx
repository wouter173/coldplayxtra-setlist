import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as StateProvider } from '../context/State';
import { Provider as OverlayProvider } from '../context/OverlayContext';
import { Provider as ModalProvider } from '../context/ModalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StateProvider>
        <OverlayProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </OverlayProvider>
      </StateProvider>
    </>
  );
}

export default MyApp;
