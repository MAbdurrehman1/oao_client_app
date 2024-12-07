import { useMemo, useState } from 'react'
import { addMinutes, format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { SessionDateTimePicker } from '@/pages/participants/components/session-datetime-picker'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { validateSessionDatetime } from '@/pages/participants/utils'
import { generateTestId } from '@/utils/test'

import { type Step } from '../types'

export const SessionDatePicker = ({
  selectedDates,
  onNextButtonClick,
  onSubmit,
  session,
}: Step['props']) => {
  if (!session || !selectedDates)
    throw new Error('`Session` and `selectedDates` must be provided.')
  const {
    campaignEndDate,
    sessions: { data: sessionsData },
  } = useParticipantData()
  if (!campaignEndDate) throw new Error('`campaignEndDate` must be provided.')
  const thisSessionDate = selectedDates[session.order - 1]?.selectedDate
  const [date, setDate] = useState<Date | undefined>(thisSessionDate)
  const [infoError, setInfoError] = useState<string | null>(null)
  const hasError = useMemo<boolean>(() => {
    if (!date) return false
    return !(date < campaignEndDate && date > new Date())
  }, [campaignEndDate, date])
  return (
    <div className="flex flex-1 flex-col space-y-s24">
      <div className="flex flex-col">
        <Typography size="s24" weight="bold" className={`md:text-s32`}>
          Session {session?.order}
        </Typography>
      </div>
      <div className="mt-s8 flex flex-row items-center space-x-s8">
        <Icon className="size-5" name="timer" />
        <Typography size="s12">{session?.duration} minutes</Typography>
      </div>
      <span>
        Please select your desired date and time for Session {session?.order}.
      </span>
      <SessionDateTimePicker
        hasError={hasError}
        infoError={infoError}
        selectedDate={thisSessionDate}
        onChange={(d) => {
          setInfoError(null)
          setDate(d)
        }}
      />
      <div
        className={`
          flex flex-col space-y-s24
          md:flex-row md:items-center md:justify-between md:space-y-0
        `}
      >
        <div
          className={`
            flex flex-col
            md:flex-row md:items-center
          `}
        >
          <span className="mr-2 text-grey-600">Selected date:</span>
          <span>
            {date
              ? `${format(date, 'LLL do y, hh:mm a')} - ${format(addMinutes(date, session.duration), 'hh:mm a')}`
              : 'N/A'}
          </span>
        </div>
        <div className="flex flex-row justify-end">
          <Button
            {...generateTestId(`confirm-step-${session.order}`)}
            disabled={!date}
            onClick={() => {
              if (date && !hasError) {
                const error = validateSessionDatetime(
                  date,
                  selectedDates,
                  sessionsData,
                  session.id,
                )
                if (error) {
                  setInfoError(error)
                } else {
                  onSubmit?.(date)
                  onNextButtonClick?.()
                }
              }
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
