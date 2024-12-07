import { Chip } from '@/components/ui/chip'
import { LinkCard } from '@/components/ui/link-card'
import { Typography } from '@/components/ui/typography'
import { type DeepDiveLearningLibraryItem } from '@/pages/participants/types'

export const LearningLibraryCard = ({
  linkProps,
  tag,
  title,
  description,
  onClick,
}: DeepDiveLearningLibraryItem) => {
  const props = linkProps.external
    ? { externalUrl: linkProps.url }
    : { to: linkProps.url, params: linkProps.params }
  return (
    <LinkCard {...props} className="space-y-s32" onClick={() => onClick?.()}>
      <div className="flex flex-col">
        <div>
          <Chip className="mb-s16 inline-flex" label={tag} />
        </div>
        <div>
          <Typography size="s24" weight="bold">
            {title}
          </Typography>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end">
        <Typography className="line-clamp-6">{description}</Typography>
      </div>
      <div>
        <Typography
          className={`inline-flex border-b border-brand-color-black pb-px`}
        >
          open →
        </Typography>
      </div>
    </LinkCard>
  )
}
