import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { Overlay } from '@radix-ui/react-dialog'

import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

export const DialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    {...generateTestId('dialog-overlay')}
    className={cn(
      `
        fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
        data-[state=open]:animate-in
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = Overlay.displayName
