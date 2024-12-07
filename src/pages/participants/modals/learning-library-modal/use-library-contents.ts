import { ApiEndpoints } from '@/api/endpoints'
import { usePaginatedData } from '@/hooks/use-paginated-data'
import { type LibraryContent } from '@/pages/participants/types'
import { type PaginatedData } from '@/types'
import { type IBackendLibraryContent } from '@/types/backend'

const libraryContentMapper = (
  item: IBackendLibraryContent,
): LibraryContent => ({
  id: item.id,
  image: item.thumbnail_url,
  description: item.description,
  title: item.title,
  url: item.content_url,
})

export const useLibraryContents = (
  libraryId: string,
): PaginatedData<LibraryContent> => {
  const libraryContentsQuery = usePaginatedData<
    IBackendLibraryContent,
    LibraryContent
  >({
    apiUrl: ApiEndpoints.GET_DEEP_DIVE_LIBRARY_CONTENTS,
    apiUrlParams: { libraryId },
    mapperFn: libraryContentMapper,
  })

  return libraryContentsQuery
}
