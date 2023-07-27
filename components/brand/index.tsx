import dark from './brand-in-dark.svg'
import light from './brand-in-light.svg'
import logo from './logo.svg'
import Image from 'next/image'
import { CSSProperties, useEffect, useState } from 'react'

;('use client')

const brands: Record<string, any> = {
  light,
  dark,
}

export type BrandProps = {
  onClick?: () => void
  size?: number
  style?: CSSProperties
  named?: boolean
  theme?: Theme | ''
}

export default function Brand({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  size = 80,
  style = {},
  named = true,
  theme = '',
}: BrandProps) {
  const [system, setSystem] = useState<Theme>('light')

  useEffect(() => {
    setSystem(
      window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark',
    )
  }, [])

  const src = named ? brands[theme || system] : logo
  return (
    <Image
      alt="desig-brand"
      src={src}
      width={size}
      style={style}
      onClick={onClick}
    />
  )
}
