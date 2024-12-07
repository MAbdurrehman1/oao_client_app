import { type ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'

export const ScoreComparisonChartWrapper = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="my-s24 flex flex-col rounded-sm bg-grey-50 p-s16">
      {children}
      <div className="flex w-full flex-row justify-between">
        <Typography size="s12" className="text-grey-600">
          0
        </Typography>
        <Typography size="s12" className="text-grey-600">
          100
        </Typography>
      </div>
    </div>
  )
}
