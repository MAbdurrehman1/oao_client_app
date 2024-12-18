import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { Description } from '@radix-ui/react-dialog'

import { cn } from '@/utils/styles'

export const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = Description.displayName
