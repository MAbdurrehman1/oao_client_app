import { forwardRef } from 'react'

import { CountUp } from '@/components/count-up'
import { Chip } from '@/components/ui/chip'
import { Typography } from '@/components/ui/typography'

interface SummaryCardProps {
  title: string
  description: string
  score: number | string
  maxScore?: number
  chipLabel?: string
  animationDelay?: number
  forceAlign?: boolean
}

const SummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(
  (props, ref) => {
    const {
      title,
      description,
      score,
      maxScore,
      chipLabel,
      animationDelay,
      forceAlign = false,
    } = props
    return (
      <div
        key={score}
        className={`
          relative shrink-0 grow-0 basis-4/5
          md:basis-2/5
        `}
        ref={ref}
      >
        <div
          className={`
            flex aspect-square flex-col items-start justify-between rounded-md
            bg-grey-50 p-s24
          `}
        >
          <Typography size="s20" weight="bold">
            {title}
          </Typography>
          <div>
            <Typography size="s48" weight="bold">
              {typeof score === 'number' ? (
                <CountUp end={score} delay={animationDelay} />
              ) : (
                score
              )}
              {maxScore && <span className="text-grey-600">/{maxScore}</span>}
            </Typography>
            {chipLabel ? (
              <Chip label={chipLabel} className="mt-s32" />
            ) : forceAlign ? (
              <div className="mt-s32 h-4" />
            ) : null}
          </div>
        </div>
        <div className="w-full pt-s32">
          <Typography size="s16">{description}</Typography>
        </div>
      </div>
    )
  },
)

export default SummaryCard
