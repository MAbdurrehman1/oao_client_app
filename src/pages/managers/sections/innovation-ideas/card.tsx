import { InnovationMetadata } from '@/components/innovation-metadata'
import { LinkCard } from '@/components/ui/link-card'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { Typography } from '@/components/ui/typography'
import { InnovationRating } from '@/pages/managers/components/innovation-rating'
import { Routes } from '@/routes'
import { type InnovationIdea } from '@/types'
import { toCapitalize } from '@/utils/string'
import { generateTestId } from '@/utils/test'

export const InnovationIdeaCard = ({
  id,
  rate,
  title,
  description,
  metadata,
}: InnovationIdea) => {
  return (
    <LinkCard
      to={Routes.INNOVATION_DETAIL_MODAL}
      params={{
        innovationId: id,
      }}
      className="mb-s8"
      {...generateTestId('innovation-card')}
    >
      <div className="flex-1">
        <InnovationRating rate={rate ?? 0} />
        <Typography
          size="s24"
          className="my-s32 line-clamp-2"
          weight="bold"
          asComp="h3"
        >
          {toCapitalize(title)}
        </Typography>
        <MarkdownParser compact className="line-clamp-6">
          {description}
        </MarkdownParser>
      </div>
      <div>
        <div className="my-s32">
          <Typography className="border-b border-brand-color-black pb-px">
            Read more
          </Typography>
        </div>
        <InnovationMetadata metadata={metadata} />
      </div>
    </LinkCard>
  )
}
