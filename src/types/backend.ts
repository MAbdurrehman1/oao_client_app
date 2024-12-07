import { type KPI } from './'

export interface IApiResult<T> {
  total_count?: number
  result: T
}

export interface IBackendRecommendation {
  id: number
  title: string
  description: string
  manager_id: number
  focus_area: Uppercase<KPI>
}

export interface IBackendInnovationIdea {
  id: number
  participation_id: string
  participant_email: string
  participant_first_name: string
  participant_last_name: string
  title: string
  description: string
  feasibility_score: number
  confidence_score: number
  impact_score: number
  rate?: number
  created_at: Date
  updated_at: Date
  user_email?: string
}

export type IBackendInnovationIdeaMatrix = Pick<
  IBackendInnovationIdea,
  'id' | 'title' | 'confidence_score' | 'feasibility_score' | 'impact_score'
>

export interface IBackendModule {
  id: number
  title: string
  description: string
  end_date: string
  duration: number
  order: 1 | 2 | 3
  created_at: Date
  updated_at: Date
  still_thumbnail_url: string
  animated_thumbnail_url: string
}

export interface IBackendModuleUrl {
  order: number
  url: string
}

export interface IBackendContentSummary {
  id: number
  module_id: number
  title: string
  description: string
  created_at: Date
  updated_at: Date
}

export interface IBackendDeepDive {
  id: number
  title: string
  description: string
  url: string
  created_at: Date
  updated_at: Date
}

export interface IBackendModuleSchedule {
  module_id: number
  selected_date: string
}

export interface IBackendOaoContent {
  id: number
  title: string
  short_description: string
  long_description: string
  content_url: string
  thumbnail_url: string
  deep_dive_id: number
  created_at: Date
  updated_at: Date
}

export interface IBackendLibrary {
  id: number
  title: string
  short_description: string
  long_description: string
  organization_id: number
  deep_dive_id: number
  created_at: string
  updated_at: string
}

export interface IBackendLibraryContent {
  id: number
  title: string
  description: string
  content_url: string
  thumbnail_url: string
  information_library_id: number
  created_at: string
  updated_at: string
}

export interface IBackendOaoContentOutcome {
  id: number
  title: string
  description: string
  oao_content_id: number
  created_at: string
  updated_at: string
}

export interface IBackendPosition {
  id: number
  management_position: {
    name: string
    id: number
  }
}

export interface IBackendKpiScore {
  id: number
  name: string
  score: number
  report_id: number
  standard_deviation: number
  created_at: string
  updated_at: string
}
