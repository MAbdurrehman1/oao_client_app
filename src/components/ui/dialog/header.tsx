import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/utils/styles'

export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('border-b transition-all', className)}
      {...props}
    />
  )
})
DialogHeader.displayName = 'DialogHeader'
