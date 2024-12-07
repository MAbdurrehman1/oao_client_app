import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type LoadableData } from '@/types'
import { type IApiResult, type IBackendModuleSchedule } from '@/types/backend'

import { SessionsProgressEnum } from './context'
import { type SessionSelectedDate } from '../types'
import { utcToLocalTime } from '../utils'

const sessionScheduleMapper = (
  item: IBackendModuleSchedule,
): SessionSelectedDate => ({
  sessionId: item.module_id,
  selectedDate: utcToLocalTime(item.selected_date),
})

export const useSessionSchedules = (
  progress: SessionsProgressEnum,
): LoadableData<SessionSelectedDate> => {
  const sessionSchedulesQuery = useQuery({
    queryKey: ['session-schedules'],
    queryFn: () =>
      apiClient.get<IApiResult<IBackendModuleSchedule[]>>(
        ApiEndpoints.GET_MODULE_SCHEDULES,
      ),
    select: (data) =>
      data.data.result
        .map(sessionScheduleMapper)
        .sort((a, b) => (a.selectedDate < b.selectedDate ? -1 : 1)),
    enabled: progress !== SessionsProgressEnum.COMPLETED,
  })

  return {
    refetch: async () => {
      await sessionSchedulesQuery.refetch()
    },
    isLoading: sessionSchedulesQuery.isLoading,
    error: sessionSchedulesQuery.error,
    data: sessionSchedulesQuery.data ?? [],
  }
}
