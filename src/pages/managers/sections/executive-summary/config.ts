import { getStaticText } from '@/hooks/use-static-text'
import {
  type ExecutiveSummary,
  ExecutiveSummaryEnum,
} from '@/pages/managers/types'

type ExecutiveSummaryConfig = {
  title: string
  scoreFn?: (score: number) => number | string
  statusTagFn?: (score: number) => string
  descriptionFn?: (score: number, data: ExecutiveSummary[]) => string
  maxScoreFn?: (score?: number) => number
}

export const executiveSummaryConfig: Record<
  ExecutiveSummaryEnum,
  ExecutiveSummaryConfig
> = {
  [ExecutiveSummaryEnum.ENGAGEMENT]: {
    title: 'Engagement',
    descriptionFn: (score) => {
      // FIXME: change this to actual maxScore
      const maxScore = 42
      const aboveHalf = score / maxScore >= 0.5
      return getStaticText(
        aboveHalf
          ? 'report_page.executive_summary.engagement_description.50_and_above'
          : 'report_page.executive_summary.engagement_description.0_to_50',
        { percentage: ((score / maxScore) * 100).toFixed(0) },
      )
    },
  },
  [ExecutiveSummaryEnum.KEY_INSIGHTS]: {
    title: 'Transformation Roadblocks',
    descriptionFn(score) {
      return getStaticText(
        'report_page.executive_summary.key_insights_description',
        { count: score },
      )
    },
    scoreFn: () => 6,
  },
  [ExecutiveSummaryEnum.SPEED_OF_TRANSFORMATION]: {
    title: 'Transformation speed',
    scoreFn: (value) => {
      if (value === 0) return 'Low'
      return value
    },
    descriptionFn() {
      return getStaticText(
        'report_page.executive_summary.speed_of_transforamtion_description',
        // FIXME: dynamic text
        { speed: 'quite low' },
      )
    },
  },
  [ExecutiveSummaryEnum.RECOMMENDATIONS_GENERATED]: {
    title: 'Actions you want to take',
    statusTagFn: (value: number) => {
      if (value === 0) return 'See Focus Area'
      if (value < 5) return 'Below 5'
      return 'More than 5'
    },
    descriptionFn(score) {
      if (score === 0)
        return getStaticText(
          'report_page.executive_summary.recommendations_generated_description.0',
          { averageRecommendations: 7 },
        )
      return getStaticText(
        'report_page.executive_summary.recommendations_generated_description.above_0',
        { count: score },
      )
    },
  },
  [ExecutiveSummaryEnum.IDEAS_REVIEWED]: {
    title: 'Ideas Reviewed',
    statusTagFn: (value: number) => {
      if (value === 0) return 'See Innovation Ideas'
      if (value < 15) return 'Below 15'
      return 'More than 15'
    },
    descriptionFn(score) {
      return getStaticText(
        'report_page.executive_summary.ideas_reviewed_description',
        { count: score },
      )
    },
    maxScoreFn: () => 10,
  },
}
