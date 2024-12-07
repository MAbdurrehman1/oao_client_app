import { type PropsWithChildren } from 'react'

import { cn } from '@/utils/styles'

export const SectionContainer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      `
        container px-s24
        xl:px-s128
      `,
      className,
    )}
  >
    {children}
  </div>
)
