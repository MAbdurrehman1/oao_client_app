import { ApiEndpoints } from '@/api/endpoints'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type InnovationIdea, type PaginatedData } from '@/types'
import { type IBackendInnovationIdea } from '@/types/backend'
import { innovationIdeaMapper } from '@/utils/mappers'

import { type InnovationIdeaListFilters } from '../types'

export const useInnovations = ({
  reportId,
  filters,
}: {
  reportId: number
  filters: InnovationIdeaListFilters
}): PaginatedData<InnovationIdea> => {
  const innovationIdeasQuery = usePaginatedData<
    IBackendInnovationIdea,
    InnovationIdea
  >({
    apiUrl: ApiEndpoints.GET_REPORT_INNOVATION_IDEAS,
    apiUrlParams: { reportId },
    mapperFn: innovationIdeaMapper,
    apiUrlExtraParams: !filters.rating
      ? ''
      : filters.rating === 'unrated'
        ? '&unrated=true'
        : `&rate=${filters.rating}`,
  })

  return innovationIdeasQuery
}
