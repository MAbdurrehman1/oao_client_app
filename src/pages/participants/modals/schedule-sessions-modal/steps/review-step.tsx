import { useState } from 'react'
import { addMinutes, format } from 'date-fns'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useParticipantData } from '@/pages/participants/data/use-participant-data'
import { createModuleSchedulePayload } from '@/pages/participants/utils'
import { generateTestId } from '@/utils/test'
import { generateUrl } from '@/utils/url'

import { type Step } from '../types'

export const Review = ({
  onNextButtonClick,
  selectedDates,
  selectedLanguage,
}: Step['props']) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const {
    sessions,
    selectedDates: sessionSchedules,
    refetchSessionUrls,
  } = useParticipantData()

  const submitSelectedDates = async () => {
    setIsSubmitting(true)
    const moduleSchedules = Array.from(selectedDates ?? []).sort(
      (a, b) =>
        sessions.data.find((i) => i.id === a.sessionId)!.order -
        sessions.data.find((i) => i.id === b.sessionId)!.order,
    )
    try {
      await apiClient.post(ApiEndpoints.SET_PREFERRED_LANG, {
        lang: selectedLanguage!.toLowerCase(),
      })
      for await (const moduleSchedule of moduleSchedules) {
        const payload = createModuleSchedulePayload(moduleSchedule.selectedDate)
        await apiClient.post(
          generateUrl(ApiEndpoints.UPSERT_MODULE_SCHEDULE, {
            id: moduleSchedule.sessionId,
          }),
          payload,
        )
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
      await sessionSchedules.refetch?.()
      await refetchSessionUrls()
      onNextButtonClick?.()
    } catch (error) {
      console.error('Review(submitSelectedDates): ', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex flex-col space-y-s16">
      <Typography size="s24" className="md:text-s32">
        Review and Submit
      </Typography>
      <Typography>
        Please review and submit the dates and times you selected. You will
        receive emails containing calendar invites for each of the sessions. You
        can also reschedule the date and time for each of the sessions later on.
      </Typography>
      {sessions.data.map((session) => {
        const sessionSelectedDate = selectedDates!.find(
          (sd) => sd.sessionId === session.id,
        )!.selectedDate
        return (
          <div
            key={session.id}
            className={`
              flex w-full flex-col
              md:flex-row md:items-center md:space-x-s4
            `}
          >
            <Typography weight="bold">Session {session.order}:</Typography>
            <Typography>
              {format(sessionSelectedDate, 'MMM do y, hh:mm a')}
              {' - '}
              {format(
                addMinutes(sessionSelectedDate, session.duration),
                'hh:mm a',
              )}
            </Typography>
          </div>
        )
      })}
      <div className="flex flex-row justify-end">
        <Button
          disabled={isSubmitting}
          {...generateTestId('submit-sessions')}
          onClick={() => {
            void submitSelectedDates()
          }}
          className="space-x-s8"
        >
          {isSubmitting && <Loading inline />}
          <span>Submit sessions</span>
        </Button>
      </div>
    </div>
  )
}
