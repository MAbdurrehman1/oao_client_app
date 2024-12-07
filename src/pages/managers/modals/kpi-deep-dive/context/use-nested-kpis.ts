import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { type NestedKpiScore } from '@/pages/managers/types'
import { type KPI, type LoadableData } from '@/types'
import { type IApiResult, type IBackendKpiScore } from '@/types/backend'
import { generateUrl } from '@/utils/url'

export const useNestedSubKpis = (kpi: KPI): LoadableData<NestedKpiScore> => {
  const { reportId } = useReportData()
  const nestedQuery = useQuery({
    queryKey: ['subkpis', kpi],
    queryFn: async () => {
      const getSubKpis = async (parentKpi: string) => {
        const { data } = await apiClient.get<IApiResult<IBackendKpiScore[]>>(
          generateUrl(ApiEndpoints.GET_REPORT_KPI_SCORES, { reportId }) +
            `?parent_kpi=${parentKpi.toUpperCase()}`,
        )
        const result: NestedKpiScore[] = []
        for await (const subkpi of data.result) {
          const subs = await getSubKpis(subkpi.name)
          const title = subkpi.name.toLocaleLowerCase().replace(/_/g, ' ')
          result.push({
            subKpis: subs,
            title,
            slug: title.replace(/ /g, '-'),
            id: subkpi.id,
            score: subkpi.score,
            kpi: parentKpi.toLocaleLowerCase().replace(/_/g, ' ') as KPI,
            minScore: subkpi.score - subkpi.standard_deviation,
            maxScore: subkpi.score + subkpi.standard_deviation,
          })
        }
        return result
      }
      const data = await getSubKpis(kpi)
      return data
    },
  })
  return {
    data: nestedQuery.data ?? [],
    isLoading: nestedQuery.isLoading,
    error: nestedQuery.error,
  }
}
