import { useMemo } from 'react'
import { m } from 'framer-motion'

import { Loading } from '@/components/loading'
import { useLayoutContext } from '@/hooks/use-layout-context'
import SummaryCard from '@/pages/managers/components/summary-card'
import { useReportData } from '@/pages/managers/hooks/use-report-data'

import { executiveSummaryConfig } from './config'

const AnimatedSummaryCard = m(SummaryCard)

export default function ExecutiveSummary() {
  const { enableAnimations } = useLayoutContext()
  const { executiveSummary } = useReportData()
  const cards = useMemo(
    () =>
      executiveSummary.data.map((item) => {
        const config = executiveSummaryConfig[item.key]
        return {
          ...item,
          title: config.title,
          maxScore: config.maxScoreFn?.() ?? item.max_score,
          description:
            config.descriptionFn?.(item.score, executiveSummary.data) ??
            item.description,
          score: config.scoreFn?.(item.score) ?? item.score,
          chipLabel: config.statusTagFn?.(item.score) ?? item.status_tag,
        }
      }) ?? [],
    [executiveSummary],
  )
  return (
    <div
      className={`
        -ml-s8 overflow-x-auto
        md:ml-0
        lg:mx-s24
      `}
    >
      <m.div
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        transition={{
          delayChildren: 0.1,
          staggerChildren: 0.1,
        }}
        initial={enableAnimations ? 'hidden' : 'visible'}
        whileInView="visible"
        viewport={{ once: true }}
        className={`
          container mt-s64 flex flex-row flex-nowrap space-x-s24 pl-s24
          md:mb-s64
          lg:grid lg:grid-cols-5 lg:gap-s24 lg:space-x-0 lg:pl-0
        `}
      >
        {cards.map((item, index) => (
          <AnimatedSummaryCard
            variants={{
              hidden: {
                top: -20,
                scale: 0.9,
                opacity: 0,
              },
              visible: {
                top: 0,
                scale: 1,
                opacity: 1,
              },
            }}
            animationDelay={enableAnimations ? index * 0.2 : 0}
            {...item}
            key={item.key}
            forceAlign
          />
        ))}
        <div
          className={`
            w-s24 shrink-0 basis-s24
            lg:hidden
          `}
        />
      </m.div>
      {executiveSummary.isLoading && <Loading className="w-full py-s64" />}
    </div>
  )
}
