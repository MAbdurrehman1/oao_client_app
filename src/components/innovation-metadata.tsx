import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { type InnovationIdea } from '@/types'
import { cn } from '@/utils/styles'

const orderedMetadata = ['feasibility', 'impact', 'confidence'] as const

export const InnovationMetadata = ({
  metadata = {
    feasibility: 0,
    impact: 0,
    confidence: 0,
  },
}: {
  metadata?: InnovationIdea['metadata']
}) => {
  return (
    <div>
      <Separator orientation="horizontal" className="mb-s16" />
      {/* The order matters */}
      {orderedMetadata.map((md) => (
        <div
          key={md}
          className={`
            mb-s8 flex flex-row items-center justify-between
            last-of-type:mb-0
          `}
        >
          <Typography
            className="capitalize leading-none text-grey-500"
            size="s12"
          >
            {md}
          </Typography>
          <div className="flex flex-row space-x-s4">
            {[1, 2, 3].map((current, index) => (
              <div
                key={index}
                className={cn(
                  'size-s16 rounded-full border border-grey-500',
                  metadata[md] && metadata[md] / 33 >= current && 'bg-grey-500',
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
