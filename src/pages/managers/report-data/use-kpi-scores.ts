import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type KPI, type LoadableData } from '@/types'
import { type IApiResult, type IBackendKpiScore } from '@/types/backend'
import { generateUrl } from '@/utils/url'

import { type KpiScore } from '../types'

export const useKpiScores = ({
  reportId,
}: {
  reportId: number
}): LoadableData<KpiScore> => {
  const kpisQuery = useQuery({
    queryKey: ['kpi-scores', reportId],
    queryFn: () =>
      apiClient.get<IApiResult<IBackendKpiScore[]>>(
        generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, { reportId }),
      ),
    select: ({ data }) =>
      data.result.map((kpiScore) => {
        const kpiKey = kpiScore.name.toLowerCase() as KPI
        return {
          title: kpiKey,
          kpi: kpiKey,
          score: kpiScore.score,
          minScore: kpiScore.score - kpiScore.standard_deviation,
          maxScore: kpiScore.score + kpiScore.standard_deviation,
        }
      }) ?? [],
  })
  return {
    data: kpisQuery.data ?? [],
    isLoading: kpisQuery.isLoading,
    error: kpisQuery.error,
  }
}
