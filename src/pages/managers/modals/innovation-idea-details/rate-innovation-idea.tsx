import { useCallback, useState } from 'react'
import StarRatings from 'react-star-ratings'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { Loading } from '@/components/loading'
import { Typography } from '@/components/ui/typography'
import { InnovationRating } from '@/pages/managers/components/innovation-rating'
import { innovationRatingDefaultProps } from '@/pages/managers/components/innovation-rating-default-props'
import { generateUrl } from '@/utils/url'

export const RateInnovationIdea = ({
  id,
  rate,
  onSuccess,
}: {
  id: string
  rate: number
  onSuccess: () => void
}) => {
  const [localRate, setRate] = useState<number>(rate)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const rateInnovationIdea = useCallback(
    async (r: number) => {
      setIsLoading(true)
      try {
        await apiClient.post(
          generateUrl(ApiEndpoints.RATE_INNOVATION_IDEA, {
            id,
          }),
          { rate: r },
        )
        setRate(r)
        onSuccess()
      } catch (error) {
        console.error('[rateInnovationIdea]:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [id, onSuccess],
  )
  return localRate > 0 ? (
    <InnovationRating rate={localRate} />
  ) : (
    <div className="flex w-full flex-row items-end justify-between">
      <Typography className="inline">Rate Innovation Idea</Typography>
      {isLoading ? (
        <Loading inline />
      ) : (
        <StarRatings
          {...innovationRatingDefaultProps}
          rating={localRate}
          changeRating={(r: number) => void rateInnovationIdea(r)}
        />
      )}
    </div>
  )
}
