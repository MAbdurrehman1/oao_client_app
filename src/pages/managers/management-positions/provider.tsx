import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { FullscreenLoading } from '@/components/fullscreen-loading'
import { SUBDOMAINS } from '@/constants'
import { useAccount } from '@/hooks/use-account'
import { useNavigate } from '@/hooks/use-navigate'
import { Routes } from '@/routes'
import { type Position } from '@/types'
import { type IApiResult, type IBackendPosition } from '@/types/backend'
import { detectSubdomain, generateUrl, getSubdomainUrl } from '@/utils/url'

import {
  type IManagementPositionsContext,
  ManagementPositionsContext,
} from './context'

export const ManagementPositionsProvider = ({
  children,
  previewReportId,
}: {
  children: ReactNode
  previewReportId: string | null
}) => {
  const [selectedManagementPosition, setSelectedManagementPosition] =
    useState<Position | null>(null)

  const { account, hasToken } = useAccount()

  const [isManagementPositionsLoading, setIsManagementPositionsLoading] =
    useState<boolean>(hasToken)

  const navigate = useNavigate()
  const { data: positionData, error: managementPositionsError } = useQuery({
    queryKey: ['positions', account?.employeeId ?? 'temp'],
    queryFn: async () => {
      const employeeId = account?.employeeId
      if (!employeeId) return
      const result = await apiClient.get<IApiResult<IBackendPosition[]>>(
        generateUrl(ApiEndpoints.GET_MANAGER_REPORTS, {
          employeeId,
        }),
      )
      if (result.data.result.length === 0) {
        // user is not a manager, redirect to participants.
        if (!detectSubdomain()) navigate(Routes.PARTICIPANTS_INDEX)
        else {
          window.location.href = getSubdomainUrl(SUBDOMAINS.PARTICIPANTS)
        }
        return
      }
      setIsManagementPositionsLoading(false)
      return result
    },
    enabled: !!account?.employeeId,
  })

  useEffect(() => {
    if (managementPositionsError) setIsManagementPositionsLoading(false)
  }, [managementPositionsError])

  const managementPositions: Position[] = useMemo(
    () =>
      positionData?.data.result.map((p) => ({
        id: p.management_position.id,
        name: p.management_position.name,
        reportId: p.id,
      })) ?? [],
    [positionData?.data.result],
  )

  useEffect(() => {
    if (previewReportId) {
      setSelectedManagementPosition({
        reportId: parseInt(previewReportId),
        id: 0,
        name: 'Admin Preview',
      })
    } else if (managementPositions[0])
      setSelectedManagementPosition(managementPositions[0])
  }, [managementPositions, previewReportId, setSelectedManagementPosition])

  const value: IManagementPositionsContext = useMemo(
    () => ({
      isLoading: isManagementPositionsLoading,
      selectedManagementPosition,
      setSelectedManagementPosition,
      managementPositions,
    }),
    [
      isManagementPositionsLoading,
      managementPositions,
      selectedManagementPosition,
    ],
  )

  return (
    <ManagementPositionsContext.Provider value={value}>
      {isManagementPositionsLoading ? <FullscreenLoading /> : children}
    </ManagementPositionsContext.Provider>
  )
}
