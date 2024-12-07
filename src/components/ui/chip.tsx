import { cn } from '@/utils/styles'

import { Typography } from './typography'

interface ChipProps {
  label: string
  className?: string
}

export const Chip = (props: ChipProps) => {
  const { label, className } = props

  return (
    <div
      className={cn(
        `
          flex items-center justify-center rounded-lg border border-grey-600
          px-s8
        `,
        className,
      )}
    >
      <Typography size="s12" className="text-grey-600">
        {label}
      </Typography>
    </div>
  )
}
