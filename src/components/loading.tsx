import { LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/styles'

export const Loading = ({
  className,
  inline = false,
}: {
  inline?: boolean
  className?: string
}) => (
  <div
    className={cn(
      'flex items-center justify-center',
      inline && 'inline-flex w-auto',
      !inline && 'w-full',
      className,
    )}
  >
    <LoaderCircle size={inline ? 16 : 20} className="animate-spin" />
  </div>
)
