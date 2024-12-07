import { useMemo, useState } from 'react'

import { SectionContainer } from '@/components/layout/section-container'
import { Loading } from '@/components/loading'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { useAccount } from '@/hooks/use-account'
import { useLayoutContext } from '@/hooks/use-layout-context'
import { useStaticText } from '@/hooks/use-static-text'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { SectionsEnum } from '@/pages/managers/types'
import { Routes } from '@/routes'
import { KpiKeys } from '@/types'
import { toCapitalize } from '@/utils/string'

import { ScoreAndKpiCard } from './card'

// FIXME: should be generated based on catAScore and catBScore
const getDesription = (index: number): string => {
  const descriptions = [
    'That’s a solid score: In line with the industry average, and higher than the company average.',
    'That’s a relatively weak score: Worse than the industry average and worse than your company average. ',
    'Super – you seem execute well.  Better than the industry and the company average. ',
  ]
  return descriptions[index] ?? descriptions[0]
}

const catAScores = {
  readiness: 30,
  guidance: 33,
  execution: 61,
}
const catBScores = {
  readiness: 40,
  guidance: 42,
  execution: 66,
}

export const ScoresAndKpisSection = () => {
  const { reportId, kpiScores } = useReportData()
  const { activeSection, enableAnimations } = useLayoutContext()
  const [shouldStartAnimations, setShouldStartAnimations] =
    useState<boolean>(!enableAnimations)
  const cards = useMemo(
    () =>
      kpiScores.data
        .filter((item) => KpiKeys.includes(item.kpi))
        .sort((a, b) => KpiKeys.indexOf(a.kpi) - KpiKeys.indexOf(b.kpi))
        .map((item, index) => ({
          ...item,
          catAScore: catAScores[item.kpi],
          catBScore: catBScores[item.kpi],
          description: getDesription(index),
          buttonLink: {
            url: Routes.KPI_DEEP_DIVE_MODAL,
            params: {
              id: reportId,
              kpi: item.kpi,
            },
          },
        })) ?? [],
    [kpiScores, reportId],
  )
  const { account } = useAccount()
  const introText = useStaticText('report_page.scores_and_kpis.intro_text', {
    firstName: toCapitalize(account?.firstName),
  })
  return (
    <SectionContainer>
      <TypewritterWithGradient
        shouldStart={activeSection === SectionsEnum.SCORES_AND_KPIS}
        className="py-s64 pl-2.5"
        lymanId="scores-and-kpis"
        text={introText}
        revealableProps={{
          className: `
          -mx-s8 grid grid-cols-1 gap-s24 py-s64
          md:mx-0 md:gap-s32
          lg:grid-cols-3 lg:gap-s64
        `,
          withButton: true,
          onButtonClickCallback: () => setShouldStartAnimations(true),
        }}
      >
        {cards.map((data, index) => (
          <ScoreAndKpiCard
            startAnimations={shouldStartAnimations}
            key={index}
            {...data}
          />
        ))}
      </TypewritterWithGradient>
      {kpiScores.isLoading && <Loading className="w-full" />}
    </SectionContainer>
  )
}
