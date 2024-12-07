import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type LoadableData } from '@/types'
import { type IApiResult } from '@/types/backend'
import { generateUrl } from '@/utils/url'

import { type ExecutiveSummary } from '../types'

type IBackendExecutiveSummary = {
  snapshots: number
  key_insights: number
  speed_of_transformation: number
  recommendations_generated: number
  ideas_reviewed: number
}

export const useExecutiveSummary = ({
  reportId,
}: {
  reportId: number
}): LoadableData<ExecutiveSummary> => {
  const executiveSummaryQuery = useQuery({
    queryKey: ['executive-summary', reportId],
    queryFn: () =>
      apiClient.get<IApiResult<IBackendExecutiveSummary>>(
        generateUrl(ApiEndpoints.GET_REPORT_EXECUTIVE_SUMMARY, {
          reportId,
        }),
      ),
    select: ({ data }) => {
      return Object.entries(data.result).map(
        ([key, val]) =>
          ({
            key,
            score: val,
          }) as ExecutiveSummary,
      )
    },
  })
  return {
    data: executiveSummaryQuery.data ?? [],
    isLoading: executiveSummaryQuery.isLoading,
    error: executiveSummaryQuery.error,
  }
}
