import Head from 'next/head'
import type { AppProps } from 'next/app'

import Footer from 'components/footer'

import CsrProvider from 'providers/csr.provider'
import UiProvider from 'providers/ui.provider'
import 'static/styles/global.scss'
import 'static/styles/notion.scss'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Desig Blog</title>
      </Head>
      <CsrProvider>
        <UiProvider>
          <div className="flex flex-col items-center justify-center">
            <Component {...pageProps} />
          </div>
          <Footer />
        </UiProvider>
      </CsrProvider>
    </>
  )
}
