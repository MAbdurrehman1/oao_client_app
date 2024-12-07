import { format } from 'date-fns'

import { InnovationMetadata } from '@/components/innovation-metadata'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { Typography } from '@/components/ui/typography'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'

export const InnovationIdeaDetails = () => {
  const { innovationIdea } = useParticipantData()
  if (innovationIdea.isLoading || !innovationIdea.data) return null
  return (
    <div
      className={`
        mt-s64 flex flex-col
        md:mt-0
      `}
    >
      <div className={`flex w-full flex-col space-y-s32`}>
        <Typography size="s32" weight="bold">
          {innovationIdea.data.title}
        </Typography>
      </div>
      <span className="my-s32 text-grey-600">
        Published: {format(innovationIdea.data.createdAt, 'dd LLLL yyyy')}
      </span>
      <InnovationMetadata metadata={innovationIdea.data?.metadata} />
      <div
        className={`
          mt-s32 flex flex-1 flex-col
          md:mt-s64
        `}
      >
        <MarkdownParser>{innovationIdea.data?.description}</MarkdownParser>
      </div>
    </div>
  )
}
