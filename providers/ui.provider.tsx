import { Fragment, ReactNode, useEffect } from 'react'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

;('use client')

const getTheme = (): Theme => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
    return 'dark'
  return 'light'
}

/**
 * Store
 */

export type UiStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUiStore = create<UiStore>()(
  devtools(
    persist(
      (set) => ({
        theme: getTheme(),
        setTheme: (theme: Theme) => set({ theme }, false, 'setTheme'),
      }),
      {
        name: 'theme',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)

/**
 * Hook
 */

export const useTheme = () => {
  return useUiStore(({ theme, setTheme }) => ({ theme, setTheme }))
}

/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme()

  console.log('theme', theme)
  // Listen theme events
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return <Fragment>{children}</Fragment>
}
