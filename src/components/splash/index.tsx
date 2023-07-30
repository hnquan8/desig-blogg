import { CSSProperties, useEffect, useState } from 'react'

import Brand from 'components/brand'
import { useDebounce } from 'react-use'

import styles from './index.module.scss'

export type RippleProps = { style?: CSSProperties }
export const Ripple = ({ style = {} }: RippleProps) => {
  return (
    <div className={styles.ripple} style={style}>
      <div />
      <div />
    </div>
  )
}

export type SplashProps = {
  open?: boolean
}

export default function Splash({ open }: SplashProps) {
  const [display, setDisplay] = useState<'block' | 'none'>('block')

  useDebounce(
    () => {
      if (!open) setDisplay('none')
    },
    300,
    [open],
  )

  useEffect(() => {
    if (open) setDisplay('block')
  }, [open])

  return (
    <div className={styles['splash-mark']} style={{ display }}>
      <div className={styles['splash-container']}>
        <Brand />
        <Ripple style={{ marginTop: 12 }} />
      </div>
    </div>
  )
}
