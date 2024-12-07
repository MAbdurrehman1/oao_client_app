import React from 'react'

import { cn } from '@/utils/styles'

export const Input = React.forwardRef<
  React.ElementRef<'input'>,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      `
        box-border inline-flex h-[3.125rem] w-full appearance-none items-center
        justify-center rounded-sm border border-brand-color-black px-s24 py-s8
        text-[0.9375rem] font-light leading-none text-brand-color-black
        outline-none transition-colors
        selection:text-brand-color-white
        hover:bg-grey-50
        focus:bg-grey-50
      `,
      className,
    )}
    {...props}
  />
))

Input.displayName = 'Input'
