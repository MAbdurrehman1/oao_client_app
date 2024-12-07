import { type KPI } from '@/types'
import { type RouteParams, type ValidAppRouteConfig } from '@/utils/url'

export enum SectionsEnum {
  EXECUTIVE_SUMMERY = 'Executive Summary',
  SCORES_AND_KPIS = 'Scores and KPIs',
  FOCUS_AREA = 'Focus Area',
  INNOVATION_IDEAS = 'Innovation Ideas',
}

export type KpiScore = {
  title: string
  kpi: KPI
  score: number
  minScore: number
  maxScore: number
}

export type NestedKpiScore = KpiScore & {
  id: number
  slug: string
  subKpis: NestedKpiScore[]
}

export type ScoreAndKpiCardType = KpiScore & {
  catAScore: number | string
  catBScore: number | string
  description: string
  buttonLink: {
    url: ValidAppRouteConfig
    params: RouteParams
  }
  startAnimations: boolean
}

export enum ExecutiveSummaryEnum {
  ENGAGEMENT = 'snapshots',
  KEY_INSIGHTS = 'key_insights',
  SPEED_OF_TRANSFORMATION = 'speed_of_transformation',
  RECOMMENDATIONS_GENERATED = 'recommendations_generated',
  IDEAS_REVIEWED = 'ideas_reviewed',
}

export interface ExecutiveSummary {
  key: ExecutiveSummaryEnum
  title: string
  description: string
  score: number
  max_score?: number
  status_tag?: string
}

export type InnovationIdeaListFilters = {
  category: string | null
  rating: number | null | 'unrated'
}
