import { cva } from 'class-variance-authority'

export const typographyVariants = cva(
  'scroll-m-20 leading-[145%] tracking-tight',
  {
    variants: {
      size: {
        s48: 'text-s48', // 3rem
        s40: 'text-s40', // 2.5rem
        s32: 'text-s32', // 2rem
        s24: 'text-s24', // 1.5rem
        s20: 'text-s20', // 1.25rem
        s16: 'text-s16', // 1rem
        s12: 'text-s12', // 0.75rem
      },
      weight: {
        default: 'font-normal',
        bold: 'font-medium',
      },
    },
    defaultVariants: {
      size: 's16',
      weight: 'default',
    },
  },
)
