import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import apiClient, { type HandledApiError } from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { useAccount } from '@/hooks/use-account'
import { useMagicLogin } from '@/hooks/use-magic-login'
import { type InnovationIdea } from '@/types'
import {
  type IApiResult,
  type IBackendInnovationIdea,
  type IBackendModule,
  type IBackendModuleUrl,
} from '@/types/backend'
import { innovationIdeaMapper } from '@/utils/mappers'

import { ParticipantDataContext, SessionsProgressEnum } from './context'
import { useDeepDives } from './use-deep-dives'
import { useSessionSchedules } from './use-session-schedules'
import { useViewedOaoContents } from './use-viewed-oao-contents'
import { type ISession, SessionStatusEnum } from '../types'
import { utcToLocalTime } from '../utils'

const NO_ACTIVE_CAMPAIGN_ERROR_MESSAGE =
  'There’re currently no active campaigns for your account.'

export const ParticipantDataProvider = ({
  children,
}: {
  children: (isLoading: boolean) => ReactNode
}) => {
  const [progress, setProgress] = useState<SessionsProgressEnum>(
    SessionsProgressEnum.NOT_SCHEDULED_YET,
  )
  const [innovationIdea, setInnovationIdea] = useState<InnovationIdea | null>(
    null,
  )
  const [campaignEndDate, setCampaignEndDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // this page may be loaded with a magic-login-token
  const { hasToken } = useAccount()
  const [readyToGetData, setReadyToGetData] = useState<boolean>(hasToken)
  const [searchParams] = useSearchParams()
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  )
  useMagicLogin({
    enabled: !!urlSearchParams.has('token'),
    onSuccessCallback: () => setReadyToGetData(true),
  })

  const autoReschedule: number | null = useMemo(() => {
    if (urlSearchParams.has('reschedule'))
      try {
        const sessionId = urlSearchParams.get('reschedule')
        return sessionId ? parseInt(sessionId) : null
      } catch (error) {
        return null
      }
    return null
  }, [urlSearchParams])

  const [sessions, setSessions] = useState<ISession[]>([])
  const sessionsQuery = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      try {
        const data = await apiClient.get<IApiResult<IBackendModule[]>>(
          ApiEndpoints.GET_MODULES,
          {
            _silentErrors: true,
          },
        )
        if (data.data.result[0]?.end_date)
          setCampaignEndDate(utcToLocalTime(data.data.result[0].end_date))
        return data
      } catch (error) {
        const handledError = error as HandledApiError
        if (handledError.statusCode === 404) {
          setIsLoading(false)
          throw NO_ACTIVE_CAMPAIGN_ERROR_MESSAGE
        }
        throw error
      }
    },
    retry(failureCount, error) {
      return String(error) === NO_ACTIVE_CAMPAIGN_ERROR_MESSAGE
        ? false
        : failureCount > 4
          ? false
          : true
    },
    select: ({ data }): ISession[] =>
      data.result
        .sort((a, b) => a.order - b.order)
        .map((session) => ({
          id: session.id,
          order: session.order,
          title: session.title,
          duration: session.duration,
          description: session.description,
          thumbnailImg: session.still_thumbnail_url,
          thumbnailGif: session.animated_thumbnail_url,
          status: SessionStatusEnum.LOCKED,
        })),
    enabled: readyToGetData,
  })

  const innovationIdeaQuery = useQuery({
    queryKey: ['participant-innovation-idea'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<
          IApiResult<IBackendInnovationIdea>
        >(ApiEndpoints.GET_PARTICIPANT_INNOVATION_IDEA, {
          _silentErrors: true,
        })
        const idea = innovationIdeaMapper(data.result)
        setInnovationIdea(idea)
        return idea
      } catch (error) {
        const handledError = error as HandledApiError
        if (handledError.statusCode === 404) setInnovationIdea(null)
        return null
      }
    },
  })

  const sessionUrlsQuery = useQuery({
    queryKey: ['sessions-urls', sessions],
    queryFn: () =>
      apiClient.get<IApiResult<IBackendModuleUrl[]> & { passed_order: number }>(
        ApiEndpoints.GET_MODULE_URLS,
      ),
    refetchInterval: 60 * 1000,
    enabled:
      readyToGetData &&
      sessions.length > 0 &&
      progress !== SessionsProgressEnum.COMPLETED,
  })

  // this hook will decide each session is in which state
  useEffect(() => {
    if (
      sessionUrlsQuery.data?.data.result &&
      sessions.length &&
      !sessions.find((s) => !!s.url)
    ) {
      const passedOrder = sessionUrlsQuery.data?.data.passed_order
      const urls = sessionUrlsQuery.data?.data.result
      const inProgressItem =
        passedOrder === 0
          ? urls[0]
          : passedOrder === 3
            ? {
                url: '',
                order: 4,
              }
            : urls.find((u) => u.order === passedOrder + 1)!
      const sessionsCopy = Array.from(sessions).map((item) => ({
        ...item,
        url: inProgressItem.url,
        status:
          item.order === inProgressItem.order
            ? SessionStatusEnum.IN_PROGRESS
            : item.order < inProgressItem.order
              ? SessionStatusEnum.COMPLETED
              : SessionStatusEnum.LOCKED,
      }))
      setSessions(sessionsCopy)
      setIsLoading(false)
    } else if (sessions.length === 0 && sessionsQuery.data) {
      setSessions(sessionsQuery.data)
    }
    // we only care about sessionUrlsQuery and sessionsQuery responses
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUrlsQuery.data, sessionsQuery.data])

  const automaticRedirect = useMemo(
    () => urlSearchParams.has('attend'),
    [urlSearchParams],
  )

  // automatic redirect in case `attend` searchparam is in the url
  useEffect(() => {
    if (automaticRedirect && sessionUrlsQuery.data) {
      const { result, passed_order } = sessionUrlsQuery.data.data
      const url = result.find((p) => p.order === passed_order + 1)?.url
      if (url) window.location.href = url
    }
  }, [automaticRedirect, sessionUrlsQuery.data, urlSearchParams])

  const sessionSchedules = useSessionSchedules(progress)
  const deepDives = useDeepDives(progress)

  useEffect(() => {
    if (sessionSchedules.data.length === 0) {
      setProgress(SessionsProgressEnum.NOT_SCHEDULED_YET)
    } else if (sessionSchedules.data.length === sessions.length) {
      if (
        sessionUrlsQuery.data?.data.passed_order ===
        Array.from(sessions).sort((a, b) => b.order - a.order)[0].order
      ) {
        if (innovationIdea?.id) setProgress(SessionsProgressEnum.COMPLETED)
        else setProgress(SessionsProgressEnum.NO_INNOVATION_IDEA_YET)
      } else setProgress(SessionsProgressEnum.NOT_COMPLETED_YET)
    }
  }, [
    innovationIdea?.id,
    sessionSchedules.data.length,
    sessionUrlsQuery.data?.data.passed_order,
    sessionUrlsQuery.data?.data.result.length,
    sessions,
  ])

  const viewedOaoContents = useViewedOaoContents(progress)

  const value = useMemo(
    () => ({
      autoReschedule,
      sessions: {
        isLoading: sessionsQuery.isLoading,
        data: sessions,
        error: sessionsQuery.error,
      },
      refetchSessionUrls: async () => {
        await sessionUrlsQuery.refetch()
      },
      innovationIdea: {
        data: innovationIdea,
        isLoading:
          innovationIdeaQuery.isLoading || innovationIdeaQuery.isRefetching,
        refetch: async () => {
          await innovationIdeaQuery.refetch()
        },
      },
      deepDives,
      selectedDates: sessionSchedules,
      campaignEndDate,
      viewedOaoContents,
      progress,
    }),
    [
      autoReschedule,
      sessionsQuery.isLoading,
      sessionsQuery.error,
      sessions,
      innovationIdea,
      innovationIdeaQuery,
      deepDives,
      sessionSchedules,
      campaignEndDate,
      viewedOaoContents,
      progress,
      sessionUrlsQuery,
    ],
  )

  return (
    <ParticipantDataContext.Provider value={value}>
      {children(isLoading || automaticRedirect)}
    </ParticipantDataContext.Provider>
  )
}
