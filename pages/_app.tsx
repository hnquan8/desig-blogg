// global styles shared across the entire site
import type { AppProps } from 'next/app'

import CsrProvider from 'providers/csr.provider'
import UiProvider from 'providers/ui.provider'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.scss'
import 'styles/notion.scss'

import Footer from '@/components/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CsrProvider>
      <UiProvider>
        <div className='flex flex-col items-center justify-center'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </UiProvider>
    </CsrProvider>
  )
}
