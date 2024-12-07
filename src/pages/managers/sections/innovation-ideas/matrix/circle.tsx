import { useMemo } from 'react'

import { type InnovationIdea } from '@/types'
import { cn } from '@/utils/styles'

export const MatrixCircle = ({
  confidence,
  clickable = true,
  active = false,
  className,
}: {
  confidence: NonNullable<InnovationIdea['metadata']['confidence']>
  clickable?: boolean
  active?: boolean
  className?: string
}) => {
  const colorClassNames = useMemo(() => {
    if (confidence < 33) return 'border border-brand-color-black'
    if (confidence < 67) return 'bg-grey-500'
    return 'bg-brand-color-black'
  }, [confidence])
  return (
    <div
      className={cn(
        `size-[25px] rounded-full transition-all`,
        colorClassNames,
        clickable && 'cursor-pointer',
        active &&
          `
            scale-125
            lg:scale-150
          `,
        clickable && !active && 'md:hover:scale-125',
        className,
      )}
    />
  )
}
