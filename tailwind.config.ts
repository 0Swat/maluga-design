import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          50: '#faf9f7',
          100: '#f0ede8',
          200: '#e3ddd5',
          300: '#c8bfb3',
          400: '#a89d8e',
          500: '#8a7d6e',
        },
        ink: {
          900: '#1a1915',
          800: '#2c2a26',
        },
        gold: {
          DEFAULT: '#b8a082',
          light: '#d4c4a8',
        },
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

export default config
