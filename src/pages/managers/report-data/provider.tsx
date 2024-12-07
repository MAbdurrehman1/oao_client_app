import { type ReactNode, useCallback, useMemo, useState } from 'react'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type Recommendation } from '@/types'
import { generateUrl } from '@/utils/url'

import { type IReportDataContext, ReportDataContext } from './context'
import { useExecutiveSummary } from './use-executive-summary'
import { useInnovations } from './use-innovations'
import { useInnovationIdeasMatrix } from './use-innovations-matrix'
import { useKpiScores } from './use-kpi-scores'
import { useRecommendations } from './use-recommendations'
import { useManagementPositions } from '../hooks/use-management-positions'
import { type InnovationIdeaListFilters } from '../types'

export const ReportDataContextProvider = ({
  reportId,
  children,
}: {
  reportId: number
  children: ReactNode
}) => {
  const { selectedManagementPosition } = useManagementPositions()
  const activeReportId = selectedManagementPosition?.reportId ?? reportId
  const [localRecommendations, setLocalRecommendations] = useState<
    Recommendation[]
  >([])
  const addToRecommendations: IReportDataContext['createNewRecommendation'] =
    useCallback(
      async (data) => {
        await apiClient.post(
          generateUrl(ApiEndpoints.GET_REPORT_GOALS, {
            reportId: activeReportId,
          }),
          {
            ...data,
            focus_area: data.kpi.toUpperCase(),
          },
        )
        setLocalRecommendations((prev) => [
          { localId: `local-${prev.length + 1}`, ...data },
          ...prev,
        ])
      },
      [activeReportId],
    )

  const executionRecommendations = useRecommendations({
    kpi: 'execution',
    reportId: activeReportId,
    localRecommendations,
  })
  const guidanceRecommendations = useRecommendations({
    kpi: 'guidance',
    reportId: activeReportId,
    localRecommendations,
  })
  const readinessRecommendations = useRecommendations({
    kpi: 'readiness',
    reportId: activeReportId,
    localRecommendations,
  })
  const [filters, setFilters] = useState<InnovationIdeaListFilters>({
    category: null,
    rating: null,
  })
  const innovationIdeas = useInnovations({
    filters,
    reportId: activeReportId,
  })
  const innovationIdeasMatrix = useInnovationIdeasMatrix({
    reportId: activeReportId,
  })
  const kpiScores = useKpiScores({
    reportId: activeReportId,
  })
  const executiveSummary = useExecutiveSummary({
    reportId: activeReportId,
  })

  const value: IReportDataContext = useMemo(
    () => ({
      reportId: activeReportId,
      recommendations: {
        execution: executionRecommendations,
        guidance: guidanceRecommendations,
        readiness: readinessRecommendations,
      },
      kpiScores,
      executiveSummary,
      createNewRecommendation: addToRecommendations,
      innovationIdeas,
      innovationIdeasMatrix,
      innovationIdeaFilters: filters,
      setInnovationIdeaFilters: setFilters,
    }),
    [
      activeReportId,
      executionRecommendations,
      guidanceRecommendations,
      readinessRecommendations,
      kpiScores,
      executiveSummary,
      addToRecommendations,
      innovationIdeas,
      filters,
      innovationIdeasMatrix,
    ],
  )

  return (
    <ReportDataContext.Provider value={value}>
      {children}
    </ReportDataContext.Provider>
  )
}
