import { ApiEndpoints } from '@/api/endpoints'
import { useAccount } from '@/hooks/use-account'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type Library, type OaoContent } from '@/pages/participants/types'
import { type PaginatedData } from '@/types'
import { type IBackendLibrary, type IBackendOaoContent } from '@/types/backend'

import {
  librariesMapper,
  oaoContentsMapper,
} from '../sections/deep-dives/mappers'

export const useDeepDiveInformation = (
  deepDiveId: number | string,
): {
  oaoContents: PaginatedData<OaoContent>
  libraries: PaginatedData<Library>
} => {
  const { account } = useAccount()
  const oaoContents = usePaginatedData<IBackendOaoContent, OaoContent>({
    apiUrl: ApiEndpoints.GET_DEEP_DIVE_OAO_CONTENTS,
    apiUrlParams: { deepDiveId },
    mapperFn: oaoContentsMapper,
  })

  const libraries = usePaginatedData<IBackendLibrary, Library>({
    apiUrl: ApiEndpoints.GET_DEEP_DIVE_LIBRARIES,
    apiUrlParams: { deepDiveId },
    mapperFn: (l) =>
      librariesMapper(l, { companyName: account?.organizationName ?? '' }),
  })

  return {
    libraries,
    oaoContents,
  }
}
