import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type IApiResult } from '@/types/backend'
import { generateUrl } from '@/utils/url'

import { type IParticipantDataContext, SessionsProgressEnum } from './context'

export const useViewedOaoContents = (
  progress: SessionsProgressEnum,
): IParticipantDataContext['viewedOaoContents'] => {
  const [locallyViewed, setLocallyViewed] = useState<number[]>([])
  const sessionSchedulesQuery = useQuery({
    queryKey: ['viewed-oao-contents'],
    queryFn: () =>
      apiClient.get<IApiResult<number[]>>(ApiEndpoints.GET_VIEWED_OAO_CONTENTS),
    select: (data) => data.data.result,
    enabled: progress === SessionsProgressEnum.COMPLETED,
  })

  const setOaoContentViewed = useCallback(async (id: number) => {
    try {
      await apiClient.post(generateUrl(ApiEndpoints.VIEW_OAO_CONTENT, { id }))
      setLocallyViewed((v) => [...v, id])
    } catch (error) {
      console.error('setOaoContentViewed', error)
    }
  }, [])

  return {
    refetch: async () => {
      await sessionSchedulesQuery.refetch()
    },
    isLoading: sessionSchedulesQuery.isLoading,
    error: sessionSchedulesQuery.error,
    data: [...(sessionSchedulesQuery.data ?? []), ...locallyViewed],
    setOaoContentViewed,
  }
}
