import { useQuery } from '@tanstack/react-query'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { type InnovationIdeaMatrix, type LoadableData } from '@/types'
import {
  type IApiResult,
  type IBackendInnovationIdeaMatrix,
} from '@/types/backend'
import { generateUrl } from '@/utils/url'

export const useInnovationIdeasMatrix = ({
  reportId,
}: {
  reportId: number
}): LoadableData<InnovationIdeaMatrix> => {
  const innovationIdeasMatrixQuery = useQuery({
    queryKey: ['innovation-ideas-matrix', reportId],
    queryFn: () =>
      apiClient.get<IApiResult<IBackendInnovationIdeaMatrix[]>>(
        generateUrl(ApiEndpoints.GET_REPORT_INNOVATION_IDEAS_MATRIX, {
          reportId,
        }),
      ),
    select: ({ data }) =>
      data.result.map((item) => ({
        id: item.id,
        title: item.title,
        metadata: {
          confidence: item.confidence_score,
          impact: item.feasibility_score,
          feasibility: item.feasibility_score,
        },
      })),
  })
  return {
    data: innovationIdeasMatrixQuery.data ?? [],
    isLoading: innovationIdeasMatrixQuery.isLoading,
    error: innovationIdeasMatrixQuery.error,
  }
}
