import { useMemo } from 'react'

import { Loading } from '@/components/loading'
import { TypewritterWithGradient } from '@/components/typewritter-with-gradient'
import { Typography } from '@/components/ui/typography'
import { type IDeepDive } from '@/pages/participants/types'

import { LearningLibraryCard } from './learning-library-card'
import { libToCard, oaoContentToCard } from './mappers'
import { useParticipantData } from '../../data/use-participant-data'
import { useDeepDiveInformation } from '../../hooks/use-deep-dive-information'

export const DeepDiveContent = ({ id, description }: IDeepDive) => {
  const { viewedOaoContents } = useParticipantData()
  const { libraries, oaoContents } = useDeepDiveInformation(id)
  const cards = useMemo(
    () => [
      ...oaoContents.data.map((i) =>
        oaoContentToCard(
          i,
          !viewedOaoContents.data.includes(i.id),
          () => void viewedOaoContents.setOaoContentViewed(i.id),
        ),
      ),
      ...libraries.data.filter((l) => !!l.organizationId).map(libToCard),
      ...libraries.data.filter((l) => !l.organizationId).map(libToCard),
    ],
    [libraries.data, oaoContents.data, viewedOaoContents],
  )
  return (
    <div
      className={`
        py-s24
        md:py-s32
      `}
    >
      <TypewritterWithGradient
        shouldStart={true}
        className={`
          mx-s8 mb-s64 w-[calc(100%-16px)] pl-2.5
          md:mx-s32 md:w-[calc(100%-64px)]
        `}
        lymanId={`deep-dives-${id}`}
        text={description}
      >
        <div className="mt-s64">
          <Typography size="s24" weight="bold">
            Deep-Dive Library
          </Typography>
        </div>
        {libraries.isLoading && oaoContents.isLoading && !cards.length && (
          <Loading className="w-full py-s64" />
        )}
        <div
          className={`
            mt-s64 grid grid-cols-1 gap-s24
            md:grid-cols-2
            lg:grid-cols-4
          `}
        >
          {cards.map((item) => (
            <LearningLibraryCard key={item.id} {...item} />
          ))}
        </div>
      </TypewritterWithGradient>
    </div>
  )
}
