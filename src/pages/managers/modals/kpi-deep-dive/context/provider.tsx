import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { type NestedKpiScore } from '@/pages/managers/types'
import { type KPI } from '@/types'

import { type IKpiDeepDiveContext, KpiDeepDiveContext } from './context'
import { type KpiScoreWithSlug } from './types'
import { useNestedSubKpis } from './use-nested-kpis'

export const KpiDeepDiveProvider = ({
  children,
  kpi,
}: {
  children: ReactNode
  kpi: KPI
}) => {
  const [flatKpis, setFlatKpis] = useState<KpiScoreWithSlug[]>([])
  const subKpis = useNestedSubKpis(kpi)
  useEffect(() => {
    const result: KpiScoreWithSlug[] = []
    const putToResult = (subkpi: NestedKpiScore) => {
      const { subKpis: nestedSubKpis, ...rest } = subkpi
      result.push(rest)
      for (const subKpi of nestedSubKpis) {
        putToResult(subKpi)
      }
    }
    for (const subKpi of subKpis.data) {
      putToResult(subKpi)
    }
    setFlatKpis(result)
  }, [subKpis.data])

  const value: IKpiDeepDiveContext = useMemo(
    () => ({
      kpi,
      subKpis,
      flatKpis,
    }),
    [kpi, subKpis, flatKpis],
  )

  return (
    <KpiDeepDiveContext.Provider value={value}>
      {children}
    </KpiDeepDiveContext.Provider>
  )
}
