import { type ReactNode } from 'react'

import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'

export const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={className}>
    <Separator className="mb-s24 mt-s64" />
    <Typography className="text-grey-500" size="s24" weight="bold">
      {children}
    </Typography>
  </div>
)
