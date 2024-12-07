import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  `
    inline-flex items-center justify-center whitespace-nowrap rounded-md
    fill-current px-s16 py-s8 text-base font-normal capitalize
    ring-offset-background transition-all
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border
    focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          border border-brand-color-black bg-brand-color-black/0
          text-brand-color-black
          hover:bg-brand-color-black hover:text-brand-color-white
        `,
        light: `
          border border-brand-color-white bg-brand-color-white/0
          text-brand-color-white
          hover:bg-brand-color-white hover:text-brand-color-black
        `,
        secondary: `
          rounded-none border-b border-transparent bg-transparent !p-0
          text-brand-color-black
          hover:border-brand-color-black
        `,
        ghost: 'hover:bg-grey-50 hover:text-foreground',
      },
      size: {
        default: '',
        icon: 'size-10 !p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
