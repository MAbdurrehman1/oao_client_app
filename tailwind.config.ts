import type { Config } from 'tailwindcss'
import TailwindAnimatePlugin from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '90rem',
      },
    },
    extend: {
      spacing: {
        // "s" as in first letter of "size",
        // usage: "p-s4" => `padding: 4px;`
        s4: '0.25rem', // 4px
        s8: '0.5rem', // 8px
        s16: '1rem', // 16px
        s24: '1.5rem', // 24px
        s32: '2rem', // 32px
        s64: '4rem', // 64px
        s128: '8rem', // 128px
        s256: '16rem', // 256px
      },
      fontSize: {
        s48: '3rem',
        s40: '2.5rem',
        s32: '2rem',
        s24: '1.5rem',
        s20: '1.25rem',
        s16: '1rem',
        s12: '0.75rem',
      },
      colors: {
        border: 'hsl(var(--grey-200))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--red-500))',
          foreground: 'hsl(var(--brand-color-white))',
        },
        'brand-color-black': 'hsl(var(--brand-color-black))',
        'brand-color-white': 'hsl(var(--brand-color-white))',
        'brand-color-pink': 'hsl(var(--brand-color-pink))',
        'brand-color-pale-pink': 'hsl(var(--brand-color-pale-pink))',
        'brand-color-green': 'hsl(var(--brand-color-green))',
        'brand-color-pale-green': 'hsl(var(--brand-color-pale-green))',
        'brand-color-blue': 'hsl(var(--brand-color-blue))',
        'brand-color-pale-blue': 'hsl(var(--brand-color-pale-blue))',
        grey: {
          25: 'hsl(var(--grey-25))',
          50: 'hsl(var(--grey-50))',
          100: 'hsl(var(--grey-100))',
          200: 'hsl(var(--grey-200))',
          300: 'hsl(var(--grey-300))',
          400: 'hsl(var(--grey-400))',
          500: 'hsl(var(--grey-500))',
          600: 'hsl(var(--grey-600))',
          700: 'hsl(var(--grey-700))',
          800: 'hsl(var(--grey-800))',
          900: 'hsl(var(--grey-900))',
        },
        pink: {
          100: 'hsl(var(--pink-100))',
          200: 'hsl(var(--pink-200))',
          300: 'hsl(var(--pink-300))',
          400: 'hsl(var(--pink-400))',
          500: 'hsl(var(--pink-500))',
          600: 'hsl(var(--pink-600))',
          700: 'hsl(var(--pink-700))',
          800: 'hsl(var(--pink-800))',
          900: 'hsl(var(--pink-900))',
        },
        blue: {
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          700: 'hsl(var(--blue-700))',
          800: 'hsl(var(--blue-800))',
          900: 'hsl(var(--blue-900))',
        },
        green: {
          100: 'hsl(var(--green-100))',
          200: 'hsl(var(--green-200))',
          300: 'hsl(var(--green-300))',
          400: 'hsl(var(--green-400))',
          500: 'hsl(var(--green-500))',
          600: 'hsl(var(--green-600))',
          700: 'hsl(var(--green-700))',
          800: 'hsl(var(--green-800))',
          900: 'hsl(var(--green-900))',
        },
        red: {
          400: 'hsl(var(--red-400))',
          500: 'hsl(var(--red-500))',
          600: 'hsl(var(--red-600))',
        },
      },
      backgroundImage: {
        'session-icon-gradient':
          'linear-gradient(112deg, rgba(255, 255, 255, 0.25) 8.14%, rgba(255, 255, 255, 0.04) 95.69%)',
      },
      boxShadow: {
        main: '0px 4px 30px 0px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: '2rem', // 32px
        md: '0.5rem', // 8px
        sm: '0.25rem', // 4px
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'rotated-bounce': {
          '0%, 100%': {
            transform: 'translateY(0%) rotate(180deg)',
            'animation-timing-function': 'cubic-bezier(0, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%) rotate(180deg)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'rotated-bounce': 'rotated-bounce 1s infinite forwards',
      },
    },
  },
  plugins: [TailwindAnimatePlugin],
} satisfies Config

export default config
