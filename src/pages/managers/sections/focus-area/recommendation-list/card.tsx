import { m } from 'framer-motion'

import { LinkCard } from '@/components/ui/link-card'
import { Typography } from '@/components/ui/typography'
import { Routes } from '@/routes'
import { type Recommendation } from '@/types'
import { cn } from '@/utils/styles'

const AnimatedLink = m(LinkCard)

export const RecommendationListCard = ({
  id,
  localId,
  title,
  description,
  className,
}: Recommendation & { className?: string }) => (
  <AnimatedLink
    to={Routes.RECOMMENDATION_DETAIL_MODAL}
    params={{
      recommendationId: id ?? localId,
    }}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2, delay: 0.2 }}
    className={cn(
      `
        mb-s32 h-[17.5rem] shrink-0 grow-0 basis-4/5 bg-background !py-s24
        hover:bg-grey-25
        md:h-auto md:basis-[30rem]
      `,
      className,
    )}
  >
    <Typography size="s24" weight="bold" asComp="h4" className="line-clamp-1">
      {title}
    </Typography>
    <Typography className="my-s32 line-clamp-4" asComp="p">
      {description}
    </Typography>
    <div className="flex flex-row items-end justify-between">
      <Typography
        className="inline grow-0 border-b border-brand-color-black leading-4"
        size="s12"
      >
        Read More
      </Typography>
      <a href="mailto:hi@oao.co" onClick={(e) => e.stopPropagation()}>
        <Typography
          className="inline grow-0 border-b border-brand-color-black pb-px"
          size="s12"
        >
          Reach out to modify
        </Typography>
      </a>
    </div>
  </AnimatedLink>
)
