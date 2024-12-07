import { useContext } from 'react'

import { ReportDataContext } from '../report-data/context'

export const useReportData = () => {
  const context = useContext(ReportDataContext)
  if (!context)
    throw new Error(
      'useReportData must be used within `ReportDataContextProvider`',
    )
  return context
}
