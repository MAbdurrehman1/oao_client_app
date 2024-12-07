import { type ReactNode } from 'react'

import { DialogDescription } from '@/components/ui/dialog'
import { Typography } from '@/components/ui/typography'

export const ModalPageHeader = ({ children }: { children: ReactNode }) => (
  <DialogDescription
    className={`
      mb-s24
      md:mb-s64
    `}
  >
    <Typography weight="bold" size="s32" className="capitalize">
      {children}
    </Typography>
  </DialogDescription>
)
