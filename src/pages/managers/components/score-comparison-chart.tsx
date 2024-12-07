import { useMemo, useRef } from 'react'
import { m } from 'framer-motion'
import { useResizeObserver } from 'usehooks-ts'

import { CountUp } from '@/components/count-up'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/styles'

type ScoreComparisonChartType = {
  title: string
  chartClassName: string
  score: number | string
  startAnimations?: boolean
} & (
  | {
      variance: {
        min: number
        max: number
      }
      colors: {
        bgColor: string
        varianceColor: string
      }
    }
  | {
      variance?: never
      colors?: never
    }
)

const AnimatedTypography = m(Typography)

const calculateLeft = (
  wrapperWidth: number,
  elementWidth: number,
  score: string | number,
) =>
  typeof score === 'number' ? (score / 100) * (wrapperWidth - elementWidth) : 0

export const ScoreComparisonChart = ({
  title,
  chartClassName,
  score,
  variance,
  colors,
  startAnimations = true,
}: ScoreComparisonChartType) => {
  const BAR_WIDTH = 12
  const ref = useRef<HTMLDivElement>(null)
  const scoreTextRef = useRef<HTMLDivElement>(null)
  const { width: chartWidth = 0 } = useResizeObserver({
    ref,
    box: 'border-box',
  })
  const { width: scoreTextWidth = 0 } = useResizeObserver({
    ref: scoreTextRef,
  })
  const barLeft = useMemo(
    () => calculateLeft(chartWidth, BAR_WIDTH, score),
    [chartWidth, score],
  )
  const scoreTextLeft = useMemo(
    () => barLeft - (scoreTextWidth - BAR_WIDTH) / 2,
    [barLeft, scoreTextWidth],
  )
  return (
    <div className="mb-s4 flex flex-col">
      <Typography size="s12" weight="bold">
        {title}
      </Typography>
      <div className="relative flex w-full flex-col pt-8">
        <AnimatedTypography
          className="absolute top-0 block w-auto"
          size="s24"
          initial={{
            x: 0,
          }}
          variants={{
            visible: {
              x: scoreTextLeft,
            },
          }}
          transition={{ delay: 0.2 }}
          whileInView={startAnimations ? 'visible' : 'initial'}
          viewport={{ once: true }}
        >
          {typeof score === 'number' ? (
            <>
              <span
                className="absolute inline-block text-center opacity-0"
                ref={scoreTextRef}
              >
                {score}
              </span>
              <CountUp end={score} shouldStart={startAnimations} />
            </>
          ) : (
            <span
              className="inline-block text-center text-s12 text-grey-600"
              ref={scoreTextRef}
            >
              {score}
            </span>
          )}
        </AnimatedTypography>
        <div
          ref={ref}
          className={cn(
            'relative mb-[0.7rem] w-full rounded-sm bg-brand-color-white',
            chartClassName,
          )}
        >
          {variance && (
            <m.div
              className={cn(
                colors.varianceColor,
                'absolute inset-y-0 rounded-sm',
              )}
              initial={{
                left: 0,
                width: 0,
              }}
              variants={{
                visible: {
                  left: `calc(${barLeft + BAR_WIDTH / 2}px - ${(variance.max - variance.min) / 2}%)`,
                  width: `${variance.max - variance.min}%`,
                },
              }}
              transition={{ delay: 0.1 }}
              whileInView={startAnimations ? 'visible' : 'initial'}
              viewport={{ once: true }}
            />
          )}
          <m.div
            className={cn(
              'absolute inset-y-0 rounded-sm',
              colors?.bgColor ?? 'bg-brand-color-black',
            )}
            style={{
              width: BAR_WIDTH,
            }}
            initial={{
              x: 0,
            }}
            variants={{
              visible: {
                x: barLeft,
              },
            }}
            transition={{ delay: 0.2 }}
            whileInView={startAnimations ? 'visible' : 'initial'}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </div>
  )
}
