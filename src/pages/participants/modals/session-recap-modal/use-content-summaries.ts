import { ApiEndpoints } from '@/api/endpoints'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type ISession, type LearningOutcome } from '@/pages/participants/types'
import { type PaginatedData } from '@/types'
import { type IBackendContentSummary } from '@/types/backend'

const contentSummaryMapper = (
  item: IBackendContentSummary,
): LearningOutcome => ({
  sessionId: item.module_id,
  title: item.title,
  description: item.description,
})

export const useContentSummaries = (
  sessionId: ISession['id'],
): PaginatedData<LearningOutcome> => {
  const contentSummariesQuery = usePaginatedData<
    IBackendContentSummary,
    LearningOutcome
  >({
    apiUrl: ApiEndpoints.GET_CONTENT_SUMMARIES,
    apiUrlParams: {
      id: sessionId,
    },
    mapperFn: contentSummaryMapper,
  })

  return contentSummariesQuery
}
