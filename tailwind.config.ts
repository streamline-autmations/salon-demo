import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:   '#b8935a',
        'accent-dark': '#9a7a48',
        ink:      '#0f0e0c',
        warm:     '#faf9f7',
        stone:    '#e8e3dc',
        muted:    '#78716c',
        surface:  '#f5f2ee',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
