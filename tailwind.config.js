/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
    {
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        "color-scheme": "light",
        "primary": "#7767F6",
        "primary-content": "#ffffff",
        "secondary": "#D926AA",
        "secondary-content": "#ffffff",
        "accent": "#1FB2A5",
        "accent-content": "#ffffff",
        "neutral": "#2a323c",
        "neutral-focus": "#242b33",
        "neutral-content": "#707072",
        "base-100": "#f5f5f5",
        "base-200": "#ffffff",
        "base-300": "#E7E7E8",
        "base-content": "#000",
      },
      dark: {
        ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        "color-scheme": "dark",
        "primary": "#7767F6",
        "primary-content": "#ffffff",
        "secondary": "#D926AA",
        "secondary-content": "#ffffff",
        "accent": "#1FB2A5",
        "accent-content": "#ffffff",
        "neutral": "#2a323c",
        "neutral-focus": "#242b33",
        "neutral-content": "#A0A0A1",
        "base-100": "#111014",
        "base-200": "#28282C",
        "base-300": "#404043",
        "base-content": "#FFFFFFD9",
      },
    },],
  },
}
