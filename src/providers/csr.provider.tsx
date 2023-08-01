import { Fragment, ReactNode } from 'react'

import Splash from 'components/splash'

import dynamic from 'next/dynamic'

export default dynamic(
  () =>
    Promise.resolve(({ children }: { children: ReactNode }) => {
      return <Fragment>{children}</Fragment>
    }),
  {
    ssr: false,
    loading: () => <Splash open />,
  },
)
