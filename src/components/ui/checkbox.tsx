import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/utils/styles'

import { Icon } from './icon'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        `
          relative flex size-4 shrink-0 items-center justify-center rounded-sm
          ring-offset-background
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
        `,
        className,
      )}
      {...props}
    >
      <Icon name="checkbox" className="absolute" />
      <CheckboxPrimitive.Indicator
        className={`absolute flex size-full items-center justify-center`}
      >
        <span className="absolute size-2 rounded-full bg-brand-color-black" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
