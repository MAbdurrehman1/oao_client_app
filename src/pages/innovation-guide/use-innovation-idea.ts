import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { apiBaseUrls } from '@/api/config'
import { LlmApiEndpoints } from '@/api/endpoints'
import { type InnovationIdea, type LoadableData } from '@/types'
import { type IBackendInnovationIdea } from '@/types/backend'
import { innovationIdeaMapper } from '@/utils/mappers'

export const useInnovationIdea = ({
  email,
}: {
  email: string | null
}): LoadableData<InnovationIdea> => {
  const innovationIdeaQuery = useQuery({
    queryKey: ['distinct-innovation-idea', email],
    queryFn: () =>
      apiClient.get<IBackendInnovationIdea[]>(
        LlmApiEndpoints.GET_INNOVATION_IDEAS + `?user_email=${email}`,
        { baseURL: apiBaseUrls.llm },
      ),
    select: ({ data }) => data.map((i) => innovationIdeaMapper(i)),
    enabled: !!email,
  })
  return {
    isLoading: innovationIdeaQuery.isLoading,
    error: innovationIdeaQuery.error,
    data: innovationIdeaQuery.data ?? [],
    refetch: async () => {
      await innovationIdeaQuery.refetch()
    },
  }
}
