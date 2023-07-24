// global styles shared across the entire site
import Footer from '@/components/footer'
import Header from '@/components/header'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import type { AppProps } from 'next/app'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
import CsrProvider from 'providers/csr.provider'
import UiProvider from 'providers/ui.provider'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
// import 'styles/notion.css'

// global style overrides for prism theme (optional)
// import 'styles/prism-theme.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CsrProvider>
      <UiProvider>
        <div className="flex justify-center bg-base-100">
          <div className="py-[10px] w-[1040px]">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </UiProvider>
    </CsrProvider>
  )
}
