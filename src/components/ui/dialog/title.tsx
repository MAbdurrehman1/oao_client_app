import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'
import { Title } from '@radix-ui/react-dialog'

import { cn } from '@/utils/styles'

import { Typography } from '../typography'

export const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, children, ...props }, ref) => (
  <Title asChild ref={ref} {...props}>
    <Typography
      size="s24"
      weight="bold"
      className={cn(
        `
          md:text-s32
          lg:text-s40
        `,
        className,
      )}
    >
      {children}
    </Typography>
  </Title>
))
DialogTitle.displayName = Title.displayName
