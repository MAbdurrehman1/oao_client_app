import { useMemo } from 'react'

import { ApiEndpoints } from '@/api/endpoints'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type KPI, type PaginatedData, type Recommendation } from '@/types'
import { type IBackendRecommendation } from '@/types/backend'

export const recommendationMapper = (
  item: IBackendRecommendation,
): Recommendation => ({
  id: item.id,
  title: item.title,
  description: item.description,
  kpi: item.focus_area.toLowerCase() as KPI,
  managerId: item.manager_id,
})

export const useRecommendations = ({
  kpi,
  reportId,
  localRecommendations,
}: {
  kpi: KPI
  reportId: number
  localRecommendations: Recommendation[]
}): PaginatedData<Recommendation> => {
  const { data: recommendations, ...recommendationsQuery } = usePaginatedData<
    IBackendRecommendation,
    Recommendation
  >({
    apiUrl: ApiEndpoints.GET_REPORT_GOALS,
    apiUrlParams: { reportId },
    mapperFn: recommendationMapper,
    apiUrlExtraParams: `&focus_area=${kpi.toUpperCase()}`,
  })

  const data = useMemo(
    () => [
      ...localRecommendations.filter((r) => r.kpi === kpi),
      ...recommendations,
    ],
    [kpi, localRecommendations, recommendations],
  )

  return {
    data,
    ...recommendationsQuery,
  }
}
