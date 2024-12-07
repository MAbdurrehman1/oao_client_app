import { Fragment, type ReactNode } from 'react'

import { Link } from '@/components/link'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { type ISession, SessionStatusEnum } from '@/pages/participants/types'
import { Routes } from '@/routes'
import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { SessionReschedule } from './session-reschedule'

export const SessionActions = ({
  order,
  status,
  url,
  id,
  className,
}: Pick<ISession, 'id' | 'order' | 'url' | 'status'> & {
  className?: string
}) => {
  const statusToActionsMap: Record<SessionStatusEnum, ReactNode[]> = {
    [SessionStatusEnum.COMPLETED]: [
      <Button
        className="space-x-s8"
        asChild
        {...generateTestId(`session-recap-btn`)}
      >
        <Link to={Routes.SESSION_RECAP_MODAL} params={{ id }}>
          <Icon className="size-4" name="external-link" />
          <Typography>Recap & Reflect</Typography>
        </Link>
      </Button>,
    ],
    [SessionStatusEnum.IN_PROGRESS]: [
      <SessionReschedule sessionOrder={order} />,
      <Button className="space-x-s8" asChild>
        <a href={url}>
          <Icon className="size-4" name="play" />
          <Typography>Play Now</Typography>
        </a>
      </Button>,
    ],
    [SessionStatusEnum.LOCKED]: [<SessionReschedule sessionOrder={order} />],
  }
  return (
    <div className={cn('flex flex-row items-center space-x-s8', className)}>
      {statusToActionsMap[status].map((action, index) => (
        <Fragment key={index}>{action}</Fragment>
      ))}
    </div>
  )
}
