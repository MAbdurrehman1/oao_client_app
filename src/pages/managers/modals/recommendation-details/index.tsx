import { useParams } from 'react-router-dom'

import { Loading } from '@/components/loading'
import { RouteDialog } from '@/components/route-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogSidebar,
  DialogTitle,
} from '@/components/ui/dialog'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { Routes } from '@/routes'

export const RecommendationDetailModal = () => {
  const { recommendationId } = useParams()
  if (!recommendationId)
    throw `RecommendationDetailModal: "recommendationId" must be provided`

  const isRecommendationLocal = recommendationId.startsWith('local')
  const { recommendations } = useReportData()
  const linearRecommendations = Object.values(recommendations)
    .map((paginatedData) => paginatedData.data)
    .flat()
  const recommendation = linearRecommendations.find((r) =>
    isRecommendationLocal
      ? r.localId === recommendationId
      : r.id === parseInt(recommendationId),
  )
  return (
    <RouteDialog navigationFallbackRoute={Routes.MANAGERS_INDEX}>
      <DialogContent
        header={<DialogTitle>{recommendation?.title}</DialogTitle>}
      >
        <div
          className={`
            flex flex-col-reverse
            md:flex-row
          `}
        >
          <DialogSidebar></DialogSidebar>
          <div
            className={`
              flex flex-1 flex-col space-y-s32
              md:ml-s64
            `}
          >
            <DialogDescription>
              {!recommendation && <Loading />}
              <MarkdownParser>{recommendation?.description}</MarkdownParser>
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </RouteDialog>
  )
}
