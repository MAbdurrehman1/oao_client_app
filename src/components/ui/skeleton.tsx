import { cn } from '@/utils/styles'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-grey-200', className)}
      {...props}
    />
  )
}

export { Skeleton }