import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
          <meta
            name="Desig"
            content="The Blockchain-Agnostic Multisig Solution"
          />
          <link
            href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
            rel="stylesheet"
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
