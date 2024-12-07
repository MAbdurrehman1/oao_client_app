import * as React from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/styles'

import { buttonVariants } from './variants'

const Slot = lazy(() =>
  import('@radix-ui/react-slot').then((m) => ({ default: m.Slot })),
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
