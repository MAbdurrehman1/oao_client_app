import { cn } from '@/utils/styles'

export const DialogSidebar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex h-full shrink-0 flex-col justify-between pb-s24
        md:sticky md:top-0 md:w-1/3 md:pb-20
      `,
      className,
    )}
    {...props}
  />
)
DialogSidebar.displayName = 'DialogSidebar'
