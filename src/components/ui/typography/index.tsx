import React from 'react'
import { type VariantProps } from 'class-variance-authority'

import { typographyVariants } from './variants'

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  asComp?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children?: React.ReactNode
}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, size, asComp, weight, ...props }, ref) => {
    const Comp = asComp ?? 'span'
    return (
      <Comp
        className={typographyVariants({
          size,
          weight,
          className,
        })}
        ref={ref}
        {...props}
      />
    )
  },
)

Typography.displayName = 'Typography'

export { Typography }
