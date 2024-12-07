import { m } from 'framer-motion'

import { fadeInUpVariant } from '@/components/motion-variants'
import { Typography } from '@/components/ui/typography'
import { type Status } from '@/store/slices/conversations/types'

import { type MessageRenderer } from './types'

export const StatusMessage = ({ message }: MessageRenderer<Status>) => {
  return (
    <m.div className="my-s4 mb-s16 flex justify-center" {...fadeInUpVariant}>
      <Typography size="s12" className="my-s4 text-grey-500">
        {message.isApproved
          ? `${message.name} has been saved to library.`
          : `${message.name} has been deleted.`}
      </Typography>
    </m.div>
  )
}
