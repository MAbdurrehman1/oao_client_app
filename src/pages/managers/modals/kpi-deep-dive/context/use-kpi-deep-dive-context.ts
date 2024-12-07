import { useContext } from 'react'

import { KpiDeepDiveContext } from './context'

export const useKpiDeepDiveContext = () => {
  const context = useContext(KpiDeepDiveContext)
  if (!context)
    throw new Error(
      'useKpiDeepDiveContext must be used within `KpiDeepDiveContextProvider`',
    )
  return context
}
