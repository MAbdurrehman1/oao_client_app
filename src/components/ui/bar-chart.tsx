import { type ReactNode, useMemo } from 'react'
import { m } from 'framer-motion'

import { cn } from '@/utils/styles'

import { Typography } from './typography'
import { CountUp } from '../count-up'

const BarChart = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        `
          flex h-[28.125rem] flex-row items-end space-x-s8 rounded-sm bg-grey-50
          p-s16
          md:min-h-[28.125rem]
        `,
        className,
      )}
    >
      {children}
    </div>
  )
}

enum BarChartItemMode {
  prev = 'prev',
  current = 'current',
  next = 'next',
}

type BarChartItemProps = {
  chartHeight: number
  subtitle: string
} & (
  | {
      mode: BarChartItemMode.next
      bgColor?: never
      value?: never
      percentChange?: never
    }
  | {
      mode: BarChartItemMode.prev
      bgColor?: never
      value: number
      percentChange: number
    }
  | {
      mode: BarChartItemMode.current
      bgColor: string
      value: number
      percentChange: number
    }
)

const customStylesPerBarMode: Record<BarChartItemMode, string> = {
  [BarChartItemMode.prev]: 'bg-grey-400',
  [BarChartItemMode.current]: '',
  [BarChartItemMode.next]: 'border',
}

const BarChartItem = ({
  value,
  percentChange,
  subtitle,
  chartHeight,
  mode,
  bgColor,
}: BarChartItemProps) => {
  const modeStyles = useMemo(
    () =>
      mode === BarChartItemMode.current
        ? bgColor
        : customStylesPerBarMode[mode],
    [bgColor, mode],
  )
  const height = useMemo(
    () => (value ? (value / chartHeight) * 100 : 66),
    [chartHeight, value],
  )
  return (
    <div className="flex size-full flex-1 flex-col items-center justify-end">
      <m.div
        className={cn(
          `
            mb-s8 flex w-full flex-col overflow-hidden rounded-sm p-s8
            md:flex-row md:items-start md:justify-between
          `,
          modeStyles,
        )}
        initial={{ height: 0 }}
        variants={{ visible: { height: `${height}%` } }}
        whileInView={'visible'}
        viewport={{ once: true }}
      >
        {value && (
          <Typography size="s24" className="md:text-s40" weight="bold">
            <CountUp end={value} />
          </Typography>
        )}
        {percentChange && (
          <Typography
            size="s16"
            className={`
              text-brand-color-white
              md:text-s24
            `}
          >
            {percentChange > 0 && '+'}
            <CountUp end={percentChange} />%
          </Typography>
        )}
      </m.div>
      {mode === BarChartItemMode.next ? (
        <Typography className="text-grey-400">({subtitle})</Typography>
      ) : (
        <Typography>{subtitle}</Typography>
      )}
    </div>
  )
}

export { BarChart, BarChartItem, BarChartItemMode }
