import { useParams } from 'react-router-dom'

import { Loading } from '@/components/loading'
import { RouteDialog } from '@/components/route-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Typography } from '@/components/ui/typography'
import { Routes } from '@/routes'
import { tryParse } from '@/utils/string'

import { SourceRow } from './source-row'
import { useLibraryContents } from './use-library-contents'
import { SessionsProgressEnum } from '../../data/context'
import { useDeepDives } from '../../data/use-deep-dives'
import { useDeepDiveInformation } from '../../hooks/use-deep-dive-information'

export const LearningLibraryModal = () => {
  const { deepDiveId, id } = useParams()
  if (!id || !deepDiveId) throw `LearningLibraryModal: "id" must be provided`
  const { data: libraryContents, isLoading } = useLibraryContents(id)
  const { data: deepDives } = useDeepDives(SessionsProgressEnum.COMPLETED)
  const deepDive = deepDives.find((d) => d.id === parseInt(deepDiveId))
  const { libraries } = useDeepDiveInformation(deepDiveId)
  const deepDiveLibrary = libraries.data.find((d) => d.id === parseInt(id))
  return (
    <RouteDialog navigationFallbackRoute={Routes.PARTICIPANTS_INDEX}>
      <DialogContent
        header={
          <DialogTitle>
            <div className="flex flex-col">
              <Typography
                size="s20"
                className={`
                  md:text-s32
                  lg:text-s40
                `}
              >
                Deep-Dive Library
              </Typography>
              <Typography
                size="s20"
                weight="default"
                className={`
                  text-grey-600
                  md:text-s32
                  lg:text-s40
                `}
              >
                {deepDiveLibrary?.title}
              </Typography>
            </div>
          </DialogTitle>
        }
      >
        <div className="flex flex-col">
          <DialogDescription
            className={`
              mb-s32 flex w-full flex-col
              md:mb-s64
            `}
          >
            <Typography size="s16">
              {deepDiveLibrary &&
                tryParse(deepDiveLibrary.longDescription, {
                  deepDiveTitle: deepDive?.title.includes(':')
                    ? deepDive?.title.split(':')[1]
                    : deepDive?.title ?? '',
                })}
            </Typography>
          </DialogDescription>
          <div className="flex flex-1 flex-col space-y-s32">
            {isLoading && !libraryContents.length && (
              <Loading className="w-full" />
            )}
            {libraryContents.map((source, index) => (
              <SourceRow key={index} {...source} />
            ))}
          </div>
        </div>
      </DialogContent>
    </RouteDialog>
  )
}
