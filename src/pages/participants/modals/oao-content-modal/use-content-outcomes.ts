import { ApiEndpoints } from '@/api/endpoints'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type OaoContentOutcome } from '@/pages/participants/types'
import { type PaginatedData } from '@/types'
import { type IBackendOaoContentOutcome } from '@/types/backend'

const oaoContentOutcomeMapper = (
  item: IBackendOaoContentOutcome,
): OaoContentOutcome => ({
  id: item.id,
  oaoContentId: item.oao_content_id,
  title: item.title,
  description: item.description,
})

export const useContentOutcomes = (
  contentId: string | number,
): PaginatedData<OaoContentOutcome> => {
  const contentOutcomesQuery = usePaginatedData<
    IBackendOaoContentOutcome,
    OaoContentOutcome
  >({
    apiUrl: ApiEndpoints.GET_OAO_CONTENT_OUTCOMES,
    apiUrlParams: {
      oaoContentId: contentId,
    },
    mapperFn: oaoContentOutcomeMapper,
  })

  return contentOutcomesQuery
}
