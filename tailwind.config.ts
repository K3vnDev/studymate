import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      animation: {
        'spin-pulse': 'spin-pulse 1.5s linear both infinite',
        'fade-in-fast': 'fade-in-fast .1s ease-in both',
        'pounce-once': 'pounce-once 1s ease-in-out'
      },
      keyframes: {
        'spin-pulse': {
          '0%': { rotate: '0deg', opacity: '1' },
          '50%': { opacity: '.8' },
          '100%': { rotate: '360deg', opacity: '1' }
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'pounce-once': {
          '0%': { translate: '0 0' },
          '50%': { translate: '0 -20%' },
          '100%': { translate: '0 0' }
        }
      }
    }
  },
  plugins: []
}
export default config
