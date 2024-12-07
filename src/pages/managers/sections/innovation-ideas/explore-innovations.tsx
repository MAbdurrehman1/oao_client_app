import { useCallback, useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { Loading } from '@/components/loading'
import { useReportData } from '@/pages/managers/hooks/use-report-data'

import { InnovationIdeaCard } from './card'
import { Filters } from './filters'
import { type InnovationIdeaListFilters } from '../../types'

export const ExploreInnovations = () => {
  const {
    innovationIdeas,
    innovationIdeaFilters: filters,
    setInnovationIdeaFilters: setFilters,
  } = useReportData()
  const onFilterChangeCb = useCallback(
    (newFilters: Partial<InnovationIdeaListFilters>) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
    },
    [setFilters],
  )
  const { data, hasMore, isLoading, getNextPage } = innovationIdeas
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  })
  useEffect(() => {
    if (isIntersecting) {
      getNextPage()
    }
    // only if we reached bottom of the list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting])
  return (
    <>
      <Filters
        onChange={onFilterChangeCb}
        filterValues={filters}
        categories={[]}
      />
      <div
        className={`
          my-s64 grid grid-cols-1 gap-s24
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        `}
      >
        {data.map((card) => (
          <InnovationIdeaCard key={card.id} {...card} />
        ))}
      </div>
      {!isLoading && data.length === 0 && (
        <div className={`flex w-full items-center justify-center`}>
          No innovation ideas.
        </div>
      )}
      {isLoading && <Loading />}
      {hasMore && !isLoading && <div ref={ref} className="size-2" />}
    </>
  )
}
