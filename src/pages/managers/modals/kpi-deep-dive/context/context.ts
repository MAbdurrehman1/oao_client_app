import { createContext } from 'react'

import { type KPI, type LoadableData } from '@/types'

import { type KpiScoreWithSlug } from './types'
import { type NestedKpiScore } from '../../../types'

export type IKpiDeepDiveContext = {
  kpi: KPI
  subKpis: LoadableData<NestedKpiScore>
  flatKpis: KpiScoreWithSlug[]
}

export const KpiDeepDiveContext = createContext<IKpiDeepDiveContext | null>(
  null,
)
