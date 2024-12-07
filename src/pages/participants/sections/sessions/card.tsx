import { Typography } from '@/components/ui/typography'
import { SessionIcon } from '@/pages/participants/components/session-icon'
import { type ISession, SessionStatusEnum } from '@/pages/participants/types'

import { SessionActions } from './session-actions'
import { SessionTags } from './session-tags'
import { SessionThumbnail } from './session-thumbnail'
import { SessionThumbnailWrapper } from './session-thumbnail-wrapper'

export const SessionCard = ({
  id,
  title,
  status,
  description,
  order,
  duration,
  thumbnailGif,
  thumbnailImg,
  url,
}: ISession) => {
  return (
    <div
      className={`
        mr-s16 flex shrink-0 grow-0 basis-4/5 flex-col space-y-s24
        md:mr-s24 md:basis-3/5
        lg:mr-0
      `}
    >
      <SessionThumbnailWrapper status={status} url={url}>
        <div className="relative flex w-full items-center justify-center">
          <SessionThumbnail
            gif={thumbnailGif}
            img={thumbnailImg}
            active={status === SessionStatusEnum.IN_PROGRESS}
          />
          <div
            className={`
              absolute flex size-[3.125rem] items-center justify-center
              rounded-md border border-white/50 backdrop-blur-sm
            `}
          >
            <SessionIcon
              status={status}
              iconClassName="size-[1.8125rem]"
              className={`
                flex h-full flex-1 items-center justify-center rounded-md
                bg-session-icon-gradient
              `}
            />
          </div>
        </div>
      </SessionThumbnailWrapper>
      <Typography size="s20" className={`md:text-s24`} weight="bold">
        Session {order}: {title}
      </Typography>
      <SessionTags
        order={order}
        duration={duration}
        status={status}
        className="space-y-s8"
      />
      <Typography>{description}</Typography>
      <SessionActions status={status} url={url} id={id} order={order} />
    </div>
  )
}
