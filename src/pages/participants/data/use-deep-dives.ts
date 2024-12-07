import { ApiEndpoints } from '@/api/endpoints'
import { useAccount } from '@/hooks/use-account'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type PaginatedData } from '@/types'
import { type IBackendDeepDive } from '@/types/backend'

import { SessionsProgressEnum } from './context'
import { type IDeepDive } from '../types'

const deepDiveMapper = (item: IBackendDeepDive): IDeepDive => ({
  id: item.id,
  title: item.title,
  description: item.description,
  url: item.url,
})

export const useDeepDives = (
  progress: SessionsProgressEnum,
): PaginatedData<IDeepDive> => {
  const { account } = useAccount()
  const deepDivesQuery = usePaginatedData<IBackendDeepDive, IDeepDive>({
    apiUrl: ApiEndpoints.GET_DEEP_DIVES,
    mapperFn: deepDiveMapper,
    apiUrlExtraParams: `&participation_id=${account?.participationId}`,
    enabled:
      !!account &&
      !!account?.participationId &&
      progress === SessionsProgressEnum.COMPLETED,
  })

  return deepDivesQuery
}
