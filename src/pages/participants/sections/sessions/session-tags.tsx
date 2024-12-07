import { useMemo } from 'react'
import { addMinutes, format } from 'date-fns'

import { Icon, type IconType } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { type ISession, SessionStatusEnum } from '@/pages/participants/types'

type TagsType = { title: string; icon: IconType }[]

export const SessionTags = ({
  order,
  status,
  className,
  duration,
}: Pick<ISession, 'duration' | 'order' | 'status'> & {
  className?: string
}) => {
  const { selectedDates } = useParticipantData()
  const thisSessionSelectedDate = useMemo(
    () => selectedDates.data[order - 1]?.selectedDate,
    [order, selectedDates.data],
  )
  const nextStepTags: TagsType = [
    {
      icon: 'timer',
      title: `${duration} mins`,
    },
    {
      icon: 'calendar',
      title: `You scheduled for ${thisSessionSelectedDate && format(thisSessionSelectedDate, 'MMM dd hh:mm a')}-${thisSessionSelectedDate && format(addMinutes(thisSessionSelectedDate, duration), 'hh:mm a')}`,
    },
  ]
  const statusToTagsMap: Record<SessionStatusEnum, TagsType> = {
    [SessionStatusEnum.COMPLETED]: [{ title: 'Completed', icon: 'trophy' }],
    [SessionStatusEnum.IN_PROGRESS]: nextStepTags,
    [SessionStatusEnum.LOCKED]: nextStepTags,
  }
  return (
    <div className={className}>
      {statusToTagsMap[status].map((tag) => (
        <div key={tag.title} className="flex flex-row items-center space-x-s8">
          <Icon className="size-5" name={tag.icon} />
          <Typography size="s12">{tag.title}</Typography>
        </div>
      ))}
    </div>
  )
}
