import { format } from 'date-fns'

import { InnovationMetadata } from '@/components/innovation-metadata'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { Typography } from '@/components/ui/typography'
import { type InnovationIdea } from '@/types'

export const InnovationIdeaDetails = ({
  innovationIdea,
}: {
  innovationIdea: InnovationIdea
}) => {
  return (
    <div className={`flex flex-col py-s128`}>
      <div className={`flex w-full flex-col space-y-s32`}>
        <Typography size="s32" weight="bold">
          {innovationIdea.title}
        </Typography>
      </div>
      <div
        className={`
          mt-s32 flex flex-1 flex-col
          md:mt-s64
        `}
      >
        <MarkdownParser>{innovationIdea.description}</MarkdownParser>
      </div>
      <span className="mt-s32 text-grey-600">
        Published: {format(innovationIdea.createdAt, 'dd LLLL yyyy')}
      </span>
      <span className="mb-s32 text-grey-600">
        Published by: {innovationIdea.participant?.email}
      </span>
      <InnovationMetadata metadata={innovationIdea.metadata} />
    </div>
  )
}
