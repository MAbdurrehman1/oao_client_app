import { useMemo, useState } from 'react'
import { format } from 'date-fns'

import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/styles'

import { useParticipantData } from '../data/use-participant-data'
import { type SessionSelectedDate } from '../types'

export const SessionDateTimePicker = ({
  hasError,
  infoError,
  selectedDate,
  onChange,
  className,
}: {
  hasError: boolean
  infoError: string | null
  selectedDate: SessionSelectedDate['selectedDate'] | undefined
  onChange: (d: Date) => void
  className?: string
}) => {
  const { campaignEndDate } = useParticipantData()
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  const disabledDays = useMemo(() => new Date(), [])
  return (
    <div className="flex flex-col items-center justify-center space-y-s16">
      {campaignEndDate && (
        <DateTimePicker
          hourCycle={12}
          granularity="minute"
          defaultMonth={disabledDays}
          value={date}
          info={
            <div className="w-full text-center text-s12 text-grey-500">
              * This is in your local timezone
            </div>
          }
          showOutsideDays={false}
          onChange={(d) => {
            setDate(d)
            if (d) onChange(d)
          }}
          className={cn(
            `
              flex w-full flex-col items-center justify-center rounded-md border
              p-s8
            `,
            className,
          )}
          disabled={{
            before: disabledDays,
            after: campaignEndDate,
          }}
        />
      )}
      <Typography
        size="s12"
        className={cn(
          'px-s8 text-grey-600 transition-colors',
          (hasError || infoError) && 'text-red-600',
        )}
      >
        {infoError ?? (
          <>
            Selected date must be after{' '}
            <b>{format(disabledDays, 'LLL do y, hh:mm a')}</b> and before{' '}
            <b>
              {campaignEndDate && format(campaignEndDate, 'LLL do y, hh:mm a')}
            </b>
            .
          </>
        )}
      </Typography>
    </div>
  )
}
