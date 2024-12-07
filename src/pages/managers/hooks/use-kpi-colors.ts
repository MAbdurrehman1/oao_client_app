import { type KPI } from '@/types'

import { useReportData } from './use-report-data'

export const useKpiColors = ({
  kpi,
  score,
}: { kpi: KPI; score?: never } | { kpi?: never; score: number }) => {
  const { kpiScores } = useReportData()
  const contextKpi = kpiScores.data.find((k) => k.kpi === kpi)
  if (!contextKpi && !score) return { bgColor: '', varianceColor: '' }
  const passedScore = kpi && contextKpi ? contextKpi.score : score ?? 0
  const colors =
    passedScore > 66
      ? {
          bgColor: 'bg-green-500',
          varianceColor: 'bg-green-200',
        }
      : passedScore > 33
        ? {
            bgColor: 'bg-blue-500',
            varianceColor: 'bg-blue-200',
          }
        : {
            bgColor: 'bg-pink-500',
            varianceColor: 'bg-pink-200',
          }
  return colors
}
