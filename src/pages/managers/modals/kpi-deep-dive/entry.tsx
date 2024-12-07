import { useParams } from 'react-router-dom'

import { type KPI } from '@/types'

import { KpiDeepDiveProvider } from './context/provider'
import { KpiDeepDiveModal } from '.'

export const KpiDeepDiveModalEntry = () => {
  const { kpi } = useParams<{
    kpi: KPI
  }>()

  return (
    <KpiDeepDiveProvider kpi={kpi!}>
      <KpiDeepDiveModal />
    </KpiDeepDiveProvider>
  )
}
