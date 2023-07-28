import Image from 'next/image'
import { CSSProperties, useEffect, useState } from 'react'

import dark from 'static/images/brand/brand-in-dark.svg'
import light from 'static/images/brand/brand-in-light.svg'
import logo from 'static/images/brand/logo.svg'

const brands: Record<string, any> = {
  light,
  dark
}

export type BrandProps = {
  onClick?: () => void
  size?: number
  style?: CSSProperties
  named?: boolean
  theme?: Theme | ''
}

export default function Brand({
  onClick = () => {},
  size = 80,
  style = {},
  named = true,
  theme = ''
}: BrandProps) {
  const [system, setSystem] = useState<Theme>('light')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setSystem('dark')
    setSystem('light')
  }, [])

  const src = named ? brands[theme || system] : logo

  return (
    <Image
      alt='desig-brand'
      src={src}
      width={size}
      style={style}
      onClick={onClick}
    />
  )
}
