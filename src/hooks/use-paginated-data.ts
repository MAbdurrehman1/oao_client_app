import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { type PaginatedData } from '@/types'
import { type IApiResult } from '@/types/backend'
import { generateUrl, type ValidApiType } from '@/utils/url'

const API_PAGE_SIZE = 10

export const usePaginatedData = <BackendType, FrontendType>({
  apiUrl,
  apiUrlParams = {},
  apiUrlExtraParams = '',
  mapperFn,
  enabled = true,
}: {
  apiUrl: ValidApiType
  mapperFn: (item: BackendType) => FrontendType
  apiUrlParams?: Record<string, string | number>
  apiUrlExtraParams?: string
  enabled?: boolean
}): PaginatedData<FrontendType> => {
  const query = useInfiniteQuery<{
    data: IApiResult<BackendType[]>
  }>({
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages, lastPageParam) => {
      const parsedLastPageParam = (lastPageParam as number) + 1
      const dataTotalLength = allPages[0].data.total_count!
      return parsedLastPageParam * API_PAGE_SIZE >= dataTotalLength
        ? null
        : parsedLastPageParam
    },
    queryKey: [apiUrl, apiUrlExtraParams, apiUrlParams],
    queryFn: ({ pageParam }) => {
      const apiPagination = `?offset=${(pageParam as number) * API_PAGE_SIZE}&limit=${API_PAGE_SIZE}`
      return apiClient.get(
        generateUrl(apiUrl, apiUrlParams) + apiPagination + apiUrlExtraParams,
      )
    },
    enabled,
  })
  const data: FrontendType[] = useMemo(
    () => query.data?.pages.flatMap((p) => p.data.result).map(mapperFn) ?? [],
    [mapperFn, query.data?.pages],
  )
  return {
    hasMore: query.hasNextPage,
    isLoading: query.isLoading || query.isFetching || query.isFetchingNextPage,
    error: query.error,
    data,
    getNextPage: () => void query.fetchNextPage(),
    refetch: async () => {
      await query.refetch()
    },
  }
}
