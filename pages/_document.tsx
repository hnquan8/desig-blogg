import Document, { Head, Html, Main, NextScript } from 'next/document'

// import { IconContext } from '@react-icons/all-files'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link
            href='https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
