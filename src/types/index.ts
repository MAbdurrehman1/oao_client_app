export const KPIs = [
  { title: 'readiness' },
  { title: 'guidance' },
  { title: 'execution' },
] as const

export const KpiKeys = KPIs.map((m) => m.title)

export type KPI = (typeof KpiKeys)[number]

export type Recommendation = {
  title: string
  description: string
  managerId?: number
  kpi: KPI
} & (
  | {
      localId: string
      id?: never
    }
  | {
      localId?: never
      id: number
    }
)

export type InnovationIdea = {
  id: number
  category: string | null
  rate: number | null
  title: string
  description: string
  createdAt: Date
  participationId: string
  participant?: {
    email: string
    name: string
  }
  metadata: {
    feasibility: number | null
    impact: number | null
    confidence: number | null
  }
}

export type InnovationIdeaMatrix = Pick<InnovationIdea, 'id' | 'title'> & {
  metadata: {
    feasibility: number
    impact: number
    confidence: number
  }
}

export type LoadableData<T> = {
  data: T[]
  isLoading: boolean
  error: unknown
  refetch?: () => Promise<void>
}

export type PaginatedData<T> = LoadableData<T> & {
  hasMore: boolean
  getNextPage: () => void
}

export type Position = {
  id: number
  name: string
  reportId: number
}
