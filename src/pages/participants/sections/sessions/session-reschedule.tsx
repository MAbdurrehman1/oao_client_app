import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Typography } from '@/components/ui/typography'
import { SessionDateTimePicker } from '@/pages/participants/components/session-datetime-picker'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { type ISession } from '@/pages/participants/types'
import {
  createModuleSchedulePayload,
  validateSessionDatetime,
} from '@/pages/participants/utils'
import { generateTestId } from '@/utils/test'
import { generateUrl } from '@/utils/url'

export const SessionReschedule = ({
  sessionOrder,
}: {
  sessionOrder: ISession['order']
}) => {
  const { selectedDates, sessions, campaignEndDate, autoReschedule } =
    useParticipantData()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [infoError, setInfoError] = useState<string | null>(null)
  const session = useMemo(
    () => sessions.data.sort((a, b) => a.order - b.order)[sessionOrder - 1],
    [sessionOrder, sessions.data],
  )
  const shouldOpenPopoverAutomatically =
    !!autoReschedule && session.id === autoReschedule
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(
    shouldOpenPopoverAutomatically,
  )
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (shouldOpenPopoverAutomatically)
      buttonRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      })
    // we only care about the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rescheduleSession = async () => {
    if (!selectedDate) return
    const error = validateSessionDatetime(
      selectedDate,
      selectedDates.data,
      sessions.data,
      session.id,
    )
    if (error) {
      setInfoError(error)
      return
    }
    setIsSubmitting(true)
    try {
      const payload = createModuleSchedulePayload(selectedDate)
      await apiClient.post(
        generateUrl(ApiEndpoints.UPSERT_MODULE_SCHEDULE, {
          id: selectedDates.data[sessionOrder - 1].sessionId,
        }),
        payload,
      )
      await selectedDates.refetch?.()
      setIsPopoverOpen(false)
      toast.success('Session Rescheduled Successfully', {
        description: 'Your calendar event has been update.',
        duration: 5_000,
      })
    } catch (error) {
      console.error('SessionReschedule(rescheduleSession): ', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const hasError = useMemo(() => {
    if (!selectedDate) return false
    return !(
      campaignEndDate &&
      selectedDate < campaignEndDate &&
      selectedDate > new Date()
    )
  }, [campaignEndDate, selectedDate])
  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(o) => {
        if (!o) setSelectedDate(undefined)
        setIsPopoverOpen(o)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          className="space-x-s8"
          {...generateTestId('reschedule-btn')}
          onClick={() => setIsPopoverOpen((o) => !o)}
        >
          <Icon className="size-4" name="calendar-add" />
          <Typography>Re-schedule</Typography>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-80 overflow-y-auto"
        sideOffset={10}
        style={{
          maxHeight: 'var(--radix-popover-content-available-height)',
        }}
      >
        <SessionDateTimePicker
          hasError={hasError}
          className="border-none !p-0"
          selectedDate={
            selectedDates.data.find((s) => s.sessionId === session.id)
              ?.selectedDate
          }
          infoError={infoError}
          onChange={(d) => {
            setInfoError(null)
            setSelectedDate(d)
          }}
        />
        <div className="mt-s24 flex w-full items-center justify-center">
          <Button
            disabled={!selectedDate || isSubmitting || hasError}
            onClick={() => void rescheduleSession()}
            className="space-x-s8"
            {...generateTestId('reschedule-submit-btn')}
          >
            <Icon className="size-4" name="calendar-add" />
            <span>Re-schedule</span>
            {isSubmitting && <Loading inline />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
