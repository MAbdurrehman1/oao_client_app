import { useMemo } from 'react'
import { m } from 'framer-motion'

import { fadeInUpVariant } from '@/components/motion-variants'
import { Typography } from '@/components/ui/typography'
import {
  type Message,
  MessageTypeEnum,
  type UserMessage as UserMessageType,
} from '@/store/slices/conversations/types'
import { cn } from '@/utils/styles'
import { generateTestId } from '@/utils/test'

import { type MessageRenderer } from './types'

export const UserMessage = ({
  message,
  nextMessage,
}: MessageRenderer<UserMessageType> & { nextMessage?: Message }) => {
  const groupMargin = useMemo(
    () => nextMessage?.type === MessageTypeEnum.USER,
    [nextMessage],
  )
  return (
    <m.div
      className={cn('mb-s24 flex justify-end', groupMargin && 'mb-s4')}
      {...fadeInUpVariant}
      {...generateTestId('user-message')}
    >
      <Typography
        weight="default"
        size="s16"
        className={`
          max-w-[80%] break-words rounded-sm bg-grey-50 px-s16 py-s4 text-right
        `}
      >
        {message.content}
      </Typography>
    </m.div>
  )
}
