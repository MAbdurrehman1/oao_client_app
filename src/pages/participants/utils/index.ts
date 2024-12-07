import { addMinutes, format, toDate } from 'date-fns'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

import { type ISession, type SessionSelectedDate } from '../types'

type CreateModuleSchedulePayload = {
  date: string
}

export const createModuleSchedulePayload = (
  selectedDate: Date,
): CreateModuleSchedulePayload => ({
  date: formatInTimeZone(selectedDate, 'UTC', 'y-MM-dd HH:mm:ss'),
})

export const utcToLocalTime = (date: string): Date =>
  toZonedTime(
    toDate(date + '.000Z'),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

export const validateSessionDatetime = (
  date: Date,
  selectedDates: SessionSelectedDate[],
  sessions: ISession[],
  sessionId: ISession['id'],
): string | null => {
  const otherSelectedDates = selectedDates.filter(
    (item) => item.sessionId !== sessionId,
  )
  const thisSessionDuration = sessions.find((s) => s.id === sessionId)!.duration
  for (const sd of otherSelectedDates) {
    const session = sessions.find((s) => s.id === sd.sessionId)!
    const otherSessionBegin = sd.selectedDate
    const otherSessionEnd = addMinutes(otherSessionBegin, session.duration)
    const thisSessionBegin = date
    const thisSessionEnd = addMinutes(thisSessionBegin, thisSessionDuration)
    if (
      (thisSessionBegin >= otherSessionBegin &&
        thisSessionBegin <= otherSessionEnd) ||
      (thisSessionEnd >= otherSessionBegin && thisSessionEnd <= otherSessionEnd)
    )
      return `Another session is scheduled from ${format(
        otherSessionBegin,
        'hh:mm a',
      )} to ${format(otherSessionEnd, 'hh:mm a')} on ${format(
        otherSessionBegin,
        'MMM do y',
      )}.`
  }
  return null
}
