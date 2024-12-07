import { useMemo } from 'react'
import { lazyWithPreload as lazy } from 'react-lazy-with-preload'
import { Outlet } from 'react-router-dom'

import { LayoutContextProvider } from '@/components/layout/provider'
import { type SectionCreator } from '@/components/layout/types'
import { Routes } from '@/routes'

import { SessionsProgressEnum } from './data/context'
import { useParticipantData } from './data/use-participant-data'
import { ParticipantsHeroSection } from './sections/hero'
import { SectionsEnum } from './types'

const DeepDivesLoader = lazy(() =>
  import(
    /* webpackChunkName: "participants-deep-dives" */ './sections/deep-dives'
  ).then((m) => ({ default: m.DeepDives })),
)

const SessionsLoader = lazy(() =>
  import(
    /* webpackChunkName: "participants-sessions" */ './sections/sessions'
  ).then((m) => ({ default: m.Sessions })),
)

export const ParticipantSections = () => {
  const {
    progress,
    sessions: { error },
  } = useParticipantData()
  const sections: SectionCreator[] = useMemo(() => {
    const sectionsArray = []
    if (progress !== SessionsProgressEnum.NOT_SCHEDULED_YET)
      sectionsArray.push({
        title: SectionsEnum.YOUR_SESSIONS,
        Component: SessionsLoader,
      })
    if (progress === SessionsProgressEnum.COMPLETED)
      sectionsArray.push({
        title: SectionsEnum.DEEP_DIVES,
        Component: DeepDivesLoader,
      })

    return sectionsArray
  }, [progress])
  return (
    <LayoutContextProvider
      sections={sections}
      baseRoute={Routes.PARTICIPANTS_INDEX}
      hasNavbar={false}
    >
      {error ? (
        <div className="flex h-screen w-screen items-center justify-center p-s24">
          {String(error)}
        </div>
      ) : (
        <ParticipantsHeroSection />
      )}
      <Outlet />
    </LayoutContextProvider>
  )
}
