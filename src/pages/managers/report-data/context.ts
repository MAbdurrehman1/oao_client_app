import { createContext } from 'react'

import {
  type InnovationIdea,
  type InnovationIdeaMatrix,
  type KPI,
  type LoadableData,
  type PaginatedData,
  type Recommendation,
} from '@/types'

import {
  type ExecutiveSummary,
  type InnovationIdeaListFilters,
  type KpiScore,
} from '../types'

export type IReportDataContext = {
  reportId: number
  kpiScores: LoadableData<KpiScore>
  executiveSummary: LoadableData<ExecutiveSummary>
  recommendations: Record<KPI, PaginatedData<Recommendation>>
  createNewRecommendation: (
    Recommendation: Pick<Recommendation, 'kpi' | 'description' | 'title'>,
  ) => Promise<void>
  innovationIdeaFilters: InnovationIdeaListFilters
  setInnovationIdeaFilters: React.Dispatch<
    React.SetStateAction<InnovationIdeaListFilters>
  >
  innovationIdeasMatrix: LoadableData<InnovationIdeaMatrix>
  innovationIdeas: PaginatedData<InnovationIdea>
}

export const ReportDataContext = createContext<IReportDataContext | null>(null)
