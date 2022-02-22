import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{ background: '#111' }}>
      <Head>
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>ColdplayXtra - Setlist Maker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#111111" />
        <meta property="og:image" content="/meta-preview.png" />
        <meta property="og:title" content="Coldplayxtra - Setlist" />
        <meta
          property="og:description"
          content="Build, customize and generate your dream Coldplay setlist to share with friends on social media"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/home-logo.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@500;600&family=Lato:wght@700;900&family=Source+Code+Pro:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body style={{ backgroundColor: '#111', maxWidth: '100%', overflowX: 'hidden' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
