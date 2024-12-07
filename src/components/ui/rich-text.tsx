import { type PropsWithChildren } from 'react'
import HTMLRenderer from 'react-html-renderer'
import { type VariantProps } from 'class-variance-authority'

import { type typographyVariants } from './typography/variants'
import { Typography } from './typography'

export const RichText = ({
  children,
  className,
  size,
}: PropsWithChildren<
  VariantProps<typeof typographyVariants> & { className?: string }
>) => (
  <HTMLRenderer
    html={children}
    components={{
      b: (props: PropsWithChildren) => (
        <Typography
          weight="bold"
          size={size}
          className={className}
          {...props}
        />
      ),
      h4: (props: PropsWithChildren) => (
        <Typography className={className} weight="bold" size="s20" {...props} />
      ),
    }}
  />
)
