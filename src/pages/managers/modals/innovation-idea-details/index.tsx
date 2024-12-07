import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import apiClient from '@/api/client'
import { ApiEndpoints } from '@/api/endpoints'
import { InnovationMetadata } from '@/components/innovation-metadata'
import { Loading } from '@/components/loading'
import { RouteDialog } from '@/components/route-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogSidebar,
  DialogTitle,
} from '@/components/ui/dialog'
import { Image } from '@/components/ui/image'
import { MarkdownParser } from '@/components/ui/markdown-parser'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { useAccount } from '@/hooks/use-account'
import { useReportData } from '@/pages/managers/hooks/use-report-data'
import { Routes } from '@/routes'
import { type IApiResult, type IBackendInnovationIdea } from '@/types/backend'
import { innovationIdeaMapper } from '@/utils/mappers'
import { generateUrl } from '@/utils/url'

import { RateInnovationIdea } from './rate-innovation-idea'

export const InnovationDetailModal = () => {
  const { innovationId } = useParams()
  if (!innovationId)
    throw `[InnovationDetailModal]: "innovationId" is undefined.`
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['innovation-ideas', innovationId],
    queryFn: async () =>
      apiClient.get<IApiResult<IBackendInnovationIdea>>(
        generateUrl(ApiEndpoints.GET_INNOVATION_IDEA, {
          id: innovationId,
        }),
      ),
    select: ({ data }) => innovationIdeaMapper(data.result),
  })
  const { innovationIdeas } = useReportData()
  const { account } = useAccount()
  return (
    <RouteDialog navigationFallbackRoute={Routes.PARTICIPANTS_INDEX}>
      <DialogContent
        header={
          <DialogTitle className="text-s24">
            {isLoading ? <Skeleton className="h-12 w-80" /> : data?.title}
          </DialogTitle>
        }
      >
        <div
          className={`
            flex flex-col-reverse
            md:flex-row
          `}
        >
          <DialogSidebar>
            <div className="flex flex-col">
              <div
                className={`
                  hidden
                  md:block
                `}
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <RateInnovationIdea
                    id={innovationId}
                    rate={data?.rate ?? 0}
                    onSuccess={() => {
                      void refetch()
                      void innovationIdeas.refetch?.()
                    }}
                  />
                )}
              </div>
              <div
                className={`
                  mb-s32 mt-s24 flex flex-row-reverse justify-between
                  md:mt-s64 md:block
                `}
              >
                <div>
                  <Typography
                    className={`
                      flex flex-row items-center space-x-s4 whitespace-nowrap
                      text-grey-600
                    `}
                    asComp="p"
                  >
                    <span className="inline-block pr-s8">Published:</span>
                    {isLoading ? (
                      <Skeleton
                        className={`
                          h-4 w-10
                          md:w-20
                        `}
                      />
                    ) : (
                      data && format(data?.createdAt, 'dd LLLL yyyy')
                    )}
                  </Typography>
                  <Typography
                    size="s20"
                    weight="bold"
                    asComp="p"
                    className="mb-s16 mt-s24"
                  >
                    {data?.participant?.name}
                  </Typography>
                  <Typography size="s20" asComp="p">
                    {data?.participant?.email}
                  </Typography>
                </div>
                <Image
                  src={account?.organizationLogoUrl}
                  className={`
                    h-s64
                    md:my-s32
                  `}
                />
              </div>
            </div>
            <InnovationMetadata metadata={data?.metadata} />
          </DialogSidebar>
          <div
            className={`
              flex flex-1 flex-col
              md:ml-s64
            `}
          >
            <div
              className={`
                mb-s24
                md:hidden
              `}
            >
              {isLoading ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <RateInnovationIdea
                  id={innovationId}
                  rate={data?.rate ?? 0}
                  onSuccess={() => {
                    void refetch()
                    void innovationIdeas.refetch?.()
                  }}
                />
              )}
            </div>
            <DialogDescription
              className={`
                mb-s32 space-y-s24
                md:space-y-s32
              `}
            >
              {isLoading ? (
                <Loading />
              ) : error ? (
                <div className="text-red-600">{String(error.message)}</div>
              ) : (
                <MarkdownParser>{data?.description}</MarkdownParser>
              )}
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </RouteDialog>
  )
}
