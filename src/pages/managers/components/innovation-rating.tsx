import StarRatings from 'react-star-ratings'

import { Chip } from '@/components/ui/chip'
import { cn } from '@/utils/styles'

import { innovationRatingDefaultProps } from './innovation-rating-default-props'

export const InnovationRating = ({
  rate = 0,
  className,
}: {
  rate?: number
  className?: string
}) => {
  return (
    <div
      className={cn('flex flex-row items-center justify-between', className)}
    >
      <Chip className="capitalize" label="your rating" />
      <StarRatings rating={rate} {...innovationRatingDefaultProps} />
    </div>
  )
}
