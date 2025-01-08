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
        'blue-10': '#CED1FF',
        'blue-20': '#6168E8',
        'blue-30': '#1820B4',
        'gray-10': '#CCCCCC',
        'gray-20': '#555555',
        'gray-30': '#363636',
        'gray-40': '#222222',
        'gray-50': '#1C1B20',
        'gray-60': '#131313',
        'gray-70': '#0C0C0C',
        'card-background': '#100F14',
        'card-border': '#332E3A',
        'main-background': 'rgb(255 255 255 / .033)',
        error: '#EF4444'
      },
      animation: {
        'spin-pulse': 'spin-pulse 1.5s linear both infinite',

        'fade-in-fast': 'fade-in 100ms ease-in both',
        'fade-in-very-fast': 'fade-in 50ms ease-in both',

        'bounce-once': 'bounce-once 1s ease-in-out',

        appear: 'fade-and-scale 250ms ease both',
        disappear: 'fade-and-scale 250ms ease reverse both'
      },
      keyframes: {
        'spin-pulse': {
          '0%': { rotate: '0deg', opacity: '1' },
          '50%': { opacity: '.8' },
          '100%': { rotate: '360deg', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'bounce-once': {
          '0%': { translate: '0 0' },
          '50%': { translate: '0 -20%' },
          '100%': { translate: '0 0' }
        },
        'fade-and-scale': {
          '0%': { opacity: '0', scale: '0.8' },
          '100%': { opacity: '1', scale: '1' }
        }
      }
    },
    boxShadow: {
      circle: '0px 0px 200px 0px',
      card: '4px 4px 12px 0px'
    }
  },
  plugins: []
}
export default config
