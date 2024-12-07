import { Fragment, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import {
  BarChart,
  BarChartItem,
  BarChartItemMode,
} from '@/components/ui/bar-chart'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'
import { useStaticText } from '@/hooks/use-static-text'
import { ScoreComparisonChart } from '@/pages/managers/components/score-comparison-chart'
import { ScoreComparisonChartWrapper } from '@/pages/managers/components/score-comparison-chart-wrapper'
import { useKpiColors } from '@/pages/managers/hooks/use-kpi-colors'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { type KPI } from '@/types'
import { toCapitalize } from '@/utils/string'

import { SectionTitle } from './section-title'
import { useKpiDeepDiveContext } from '../context/use-kpi-deep-dive-context'

export const ScoreAndComparison = () => {
  const { kpi, level, subLevel } = useParams<{
    kpi: KPI
    id: string
    subLevel: string
    level: string
  }>()
  const { kpiScores } = useReportData()
  const { flatKpis } = useKpiDeepDiveContext()
  const kpiScore = useMemo(() => {
    if (!level && !subLevel) return kpiScores.data.find((k) => k.kpi === kpi)
    if (!subLevel) return flatKpis.find((k) => k.slug === level)
    return flatKpis.find((k) => k.slug === subLevel)
  }, [flatKpis, kpi, kpiScores, level, subLevel])
  const score = useMemo(() => kpiScore?.score ?? 0, [kpiScore])
  const colorsPayload =
    level || subLevel ? { score: kpiScore?.score ?? 0 } : { kpi: kpi! }
  const colors = useKpiColors(colorsPayload)
  const scoreAndComparisonText = useStaticText(
    'report_page.kpi_deep_dive_popup.score_and_comparison_text',
    {
      kpi: toCapitalize(kpi),
    },
  )
  return (
    <Fragment key={`${kpi}-${level}-${subLevel}`}>
      <SectionTitle className="mb-s64">Score and Comparison</SectionTitle>
      <Typography className="mb-s64">{scoreAndComparisonText}</Typography>
      <div
        className={`
          flex flex-col
          md:flex-row md:items-center md:justify-between
        `}
      >
        <Typography asComp="h4" size="s24" weight="bold" className="capitalize">
          {toCapitalize(kpiScore?.title)} Score
        </Typography>
        <div
          className={`
            flex flex-col
            md:flex-row md:items-center md:space-x-2.5
          `}
        >
          <Typography
            className={`
              mb-s16 mt-s32 text-grey-600
              md:my-0
            `}
          >
            Compare against:
          </Typography>
          <DropdownMenu>
            <DropdownMenuTrigger>Select up to 4</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {/* TODO: what should be here? */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScoreComparisonChartWrapper>
        {colors && (
          <ScoreComparisonChart
            title="You"
            variance={{
              min: Math.max(score - 5, 0),
              max: score + 5,
            }}
            colors={colors}
            score={score}
            chartClassName="h-[3.2rem]"
          />
        )}
      </ScoreComparisonChartWrapper>
      <Typography
        asComp="h4"
        size="s24"
        weight="bold"
        className="mb-s24 mt-s64 capitalize"
      >
        trend
      </Typography>
      <BarChart>
        <BarChartItem
          value={score * 0.81}
          percentChange={10}
          chartHeight={score * 2}
          subtitle="2022"
          mode={BarChartItemMode.prev}
        />
        <BarChartItem
          value={score * 0.9}
          percentChange={10}
          chartHeight={score * 2}
          subtitle="2023"
          mode={BarChartItemMode.prev}
        />
        <BarChartItem
          value={score}
          bgColor={colors.bgColor}
          percentChange={10}
          chartHeight={score * 2}
          subtitle="2024"
          mode={BarChartItemMode.current}
        />
        <BarChartItem
          chartHeight={score * 2}
          subtitle="2025"
          mode={BarChartItemMode.next}
        />
      </BarChart>
      <Typography className="my-s64">
        Great, your scores have been improving significantly since last year –
        moving up by 10 points. It’s a good sign, but there’s still room for
        improvement.
      </Typography>
    </Fragment>
  )
}
