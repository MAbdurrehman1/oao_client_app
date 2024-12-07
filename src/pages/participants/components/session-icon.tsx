import { Icon, type IconType } from '@/components/ui/icon'
import { SessionStatusEnum } from '@/pages/participants/types'
import { cn } from '@/utils/styles'

export const SessionIcon = ({
  status,
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
  status: SessionStatusEnum
}) => {
  const statusToIconMap: Record<SessionStatusEnum, IconType> = {
    [SessionStatusEnum.COMPLETED]: 'badge',
    [SessionStatusEnum.IN_PROGRESS]: 'play',
    [SessionStatusEnum.LOCKED]: 'lock',
  }
  return (
    <div className={className}>
      <Icon
        name={statusToIconMap[status]}
        className={cn('fill-inherit', iconClassName)}
      />
    </div>
  )
}
