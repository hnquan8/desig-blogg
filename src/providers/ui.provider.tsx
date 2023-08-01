import { Fragment, ReactNode, useEffect } from 'react'
import { create } from 'zustand'

import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const autoTheme = (): Theme => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  )
    return 'light'
  return 'dark'
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
        theme: 'light',
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
  return useUiStore(({ theme, setTheme }) => ({
    theme: theme || autoTheme(),
    setTheme,
  }))
}

/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme()

  // Listen theme events
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return <Fragment>{children}</Fragment>
}
