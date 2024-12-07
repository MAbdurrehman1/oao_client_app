import { type PropsWithChildren } from 'react'

import { type ISession, SessionStatusEnum } from '@/pages/participants/types'

export const SessionThumbnailWrapper = ({
  status,
  url,
  children,
}: PropsWithChildren<Pick<ISession, 'status' | 'url'>>) => {
  if (status === SessionStatusEnum.IN_PROGRESS && url)
    return <a href={url}>{children}</a>
  return children
}
