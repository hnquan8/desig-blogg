import * as React from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'
import LoadingIcon from 'static/images/LoadingIcon.svg'

export const Loading: React.FC = () => (
  <div className={styles.container}>
    <Image
      src={LoadingIcon}
      alt='cover'
      layout='fill'
      objectFit='cover'
      objectPosition='center'
    />
  </div>
)
