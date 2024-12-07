import { useMemo } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

import { LayoutContextProvider } from '@/components/layout/provider'
import { Routes } from '@/routes'
import { getPreviewReportId } from '@/utils/preview-report'
import { isCypressTesting } from '@/utils/test'

import { ManagementPositionsProvider } from './management-positions/provider'
import { ReportDataContextProvider } from './report-data/provider'
import ExecutiveSummary from './sections/executive-summary'
import FocusArea from './sections/focus-area'
import { HeroSection } from './sections/hero'
import { InnovationIdeasSection } from './sections/innovation-ideas'
import { ScoresAndKpisSection } from './sections/scores-and-kpis'
import { SelectPositionDropdown } from './select-position-dropdown'
import { SectionsEnum } from './types'

export const ManagersPage = () => {
  const [searchParams] = useSearchParams()
  const previewReportId = searchParams.has('previewReportId')
    ? (searchParams.get('previewReportId') as string)
    : '1'
  const memoizedReportId = useMemo(
    () => (isCypressTesting ? 1 : parseInt(previewReportId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const sections = [
    {
      title: SectionsEnum.EXECUTIVE_SUMMERY,
      Component: ExecutiveSummary,
    },
    {
      title: SectionsEnum.SCORES_AND_KPIS,
      Component: ScoresAndKpisSection,
    },
    {
      title: SectionsEnum.FOCUS_AREA,
      Component: FocusArea,
    },
    {
      title: SectionsEnum.INNOVATION_IDEAS,
      Component: InnovationIdeasSection,
    },
  ]
  return (
    <ManagementPositionsProvider previewReportId={getPreviewReportId()}>
      <ReportDataContextProvider reportId={memoizedReportId}>
        <LayoutContextProvider
          baseRoute={Routes.MANAGERS_INDEX}
          sections={sections}
          navbarExtra={<SelectPositionDropdown />}
        >
          <HeroSection />
          <Outlet />
        </LayoutContextProvider>
      </ReportDataContextProvider>
    </ManagementPositionsProvider>
  )
}
