import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from '@/components/link'
import { buttonVariants } from '@/components/ui/button/variants'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import SummaryCard from '@/pages/managers/components/summary-card'
import { Routes } from '@/routes'
import { type KPI } from '@/types'
import { toCapitalize } from '@/utils/string'
import { cn } from '@/utils/styles'

import { SectionTitle } from './section-title'
import { useKpiDeepDiveContext } from '../context/use-kpi-deep-dive-context'

export const DiveDeeper = () => {
  const { id, kpi, level } = useParams<{
    kpi: KPI
    id: string
    level: string
  }>()
  const { subKpis } = useKpiDeepDiveContext()
  const links = useMemo(() => {
    if (!level) return subKpis.data ?? []
    return subKpis.data.find((k) => k.title === level)?.subKpis ?? []
  }, [level, subKpis.data])
  return (
    <>
      <SectionTitle>Dive Deeper</SectionTitle>
      <Typography className="my-s64">
        Now let’s look at the two drivers of your guidance score in detail:
        Vision and Leadership.
      </Typography>
      <div
        className={`
          grid grid-cols-1 gap-s24
          md:grid-cols-2
        `}
      >
        {links.map((ssk) => (
          <div>
            <SummaryCard
              title={toCapitalize(ssk.title)!}
              description={
                ssk.score < 50
                  ? `Your ${ssk.title} score is low. Let’s have a closer look at the ${ssk.subKpis.map((sssk) => sssk.title).join(' and ')} strength – how could you improve here?`
                  : `There seems to be room for improvement with your ${ssk.title}, especially regarding its expertise mix. Something you can change?`
              }
              score={ssk.score}
              maxScore={100}
            />
            <Link
              to={
                level
                  ? Routes.KPI_DEEP_DIVE_MODAL_SECOND_LEVEL
                  : Routes.KPI_DEEP_DIVE_MODAL_FIRST_LEVEL
              }
              params={
                level
                  ? {
                      id: id!,
                      kpi: kpi!,
                      level,
                      subLevel: ssk.slug,
                    }
                  : {
                      id: id!,
                      kpi: kpi!,
                      level: ssk.slug,
                    }
              }
              className={cn(buttonVariants(), 'mt-s24 space-x-s4')}
            >
              <Icon name="external-link" />
              <span>deep dive</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
